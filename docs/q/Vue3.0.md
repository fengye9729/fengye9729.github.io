# Vue 3.0 与 Vue2.x 双向绑定的区别

> 观察机制的改变

更完备、更精准、更高效，可以对响应式跟踪进行调试，新增了一个创建可观察对象（observable）的 API。
3.0 版本里将有一个基于 `Proxy` 的观察者，它会提供全语言覆盖的响应式跟踪。相比于 2.x 版本里基于 `Object.defineProperty` 的观察者，新的实现更加强大：
- 可以检测属性的新增和删除
- 可以检测数组索引的变化和 length 的变化
- 支持 Map、Set、WeakMap 和 WeakSet

**Vue 三要素**
- 响应式：如何监听数据变化
- 模板引擎：如何解析模板
- 渲染：如何将监听到的数据和解析后的 HTML 进行渲染

基于数据劫持的双向绑定的实现
- Object.defineProperty
- Proxy

[以下内容参考](https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf#heading-4)
> 数据劫持之 Object.defineProperty

```js
// 这是将要被劫持的对象
const data = {
  name: '',
};

function say(name) {
  if (name === '古天乐') {
    console.log('给大家推荐一款超好玩的游戏');
  } else if (name === '渣渣辉') {
    console.log('戏我演过很多,可游戏我只玩贪玩懒月');
  } else {
    console.log('来做我的兄弟');
  }
}

// 遍历对象,对其属性值进行劫持
Object.keys(data).forEach(function(key) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('get');
    },
    set: function(newVal) {
      // 当属性值发生变化时我们可以进行额外操作
      console.log(`大家好,我系${newVal}`);
      say(newVal);
    },
  });
});

data.name = '渣渣辉';
//大家好,我系渣渣辉
//戏我演过很多,可游戏我只玩贪玩懒月
```

**数据劫持的优势**
- 无需显示调用：Vue 运用**数据劫持+发布订阅**,直接可以通知变化并驱动视图
- 可精确得知变化数据：劫持了属性的 setter,当属性值改变,我们可以精确获知变化的内容 newVal，这里不需要额外的 diff 操作,否则我们只知道数据发生了变化而不知道具体哪些数据变化了,这个时候需要大量 diff 来找出变化值,这是额外性能损耗。

![](../images/data-observer.jpg)

**极简版双向绑定**
```js
const obj = {};
Object.defineProperty(obj, 'text', {
  get: function() {
    console.log('get val');&emsp;
  },
  set: function(newVal) {
    console.log('set val:' + newVal);
    document.getElementById('input').value = newVal;
    document.getElementById('span').innerHTML = newVal;
  }
});

const input = document.getElementById('input');
input.addEventListener('keyup', function(e){
  obj.text = e.target.value;
})
```
以上代码存在的问题：
- 我们只监听了一个属性,一个对象不可能只有一个属性,我们需要对对象每个属性进行监听。
- 违反开放封闭原则,我们如果了解开放封闭原则的话,上述代码是明显违反此原则,我们每次修改都需要进入方法内部,这是需要坚决杜绝的。
- 代码耦合严重,我们的数据、方法和DOM都是耦合在一起的，就是传说中的面条代码。

**优化后**
订阅发布中心Dep(消息管理员)：负责存储订阅者和消息的分发
```js
let uid = 0;
// 用于储存订阅者并发布消息
class Dep {
  constructor() {
    // 设置id,用于区分新Watcher和只改变属性值后新产生的Watcher
    this.id = uid++;
    // 储存订阅者的数组
    this.subs = [];
  }
  // 触发target上的Watcher中的addDep方法,参数为dep的实例本身
  depend() {
    Dep.target.addDep(this);
  }
  // 添加订阅者
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    // 通知所有的订阅者(Watcher)，触发订阅者的相应逻辑处理
    this.subs.forEach(sub => sub.update());
  }
}
// 为Dep类设置一个静态属性,默认为null,工作时指向当前的Watcher
Dep.target = null;
```
监听者 Observer:监听属性的变化
```js
// 监听者,监听对象属性值的变化
class Observer {
  constructor(value) {
    this.value = value;
    this.walk(value);
  }
  // 遍历属性值并监听
  walk(value) {
    Object.keys(value).forEach(key => this.convert(key, value[key]));
  }
  // 执行监听的具体方法
  convert(key, val) {
    defineReactive(this.value, key, val);
  }
}

function defineReactive(obj, key, val) {
  const dep = new Dep();
  // 给当前属性的值添加监听
  let chlidOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
      // target指向一个Watcher实例，每个Watcher都是一个订阅者
      // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
      if (Dep.target) {
        dep.depend();
      }
      return val;
    },
    set: newVal => {
      if (val === newVal) return;
      val = newVal;
      // 对新值进行监听
      chlidOb = observe(newVal);
      // 通知所有订阅者，数值被改变了
      dep.notify();
    },
  });
}

function observe(value) {
  // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
  if (!value || typeof value !== 'object') {
    return;
  }
  return new Observer(value);
}
```
订阅者 Watcher:
```js
class Watcher {
  constructor(vm, expOrFn, cb) {
    this.depIds = {}; // hash储存订阅者的id,避免重复的订阅者
    this.vm = vm; // 被订阅的数据一定来自于当前Vue实例
    this.cb = cb; // 当数据更新时想要做的事情
    this.expOrFn = expOrFn; // 被订阅的数据
    this.val = this.get(); // 维护更新之前的数据
  }
  // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用
  update() {
    this.run();
  }
  addDep(dep) {
    // 如果在depIds的hash中没有当前的id,可以判断是新Watcher,因此可以添加到dep的数组中储存
    // 此判断是避免同id的Watcher被多次储存
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this);
      this.depIds[dep.id] = dep;
    }
  }
  run() {
    const val = this.get();
    console.log(val);
    if (val !== this.val) {
      this.val = val;
      this.cb.call(this.vm, val);
    }
  }
  get() {
    // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
    Dep.target = this;
    const val = this.vm._data[this.expOrFn];
    // 置空，用于下一个Watcher使用
    Dep.target = null;
    return val;
  }
}
```
将上述方法挂载到 Vue 上
```js
class Vue {
  constructor(options = {}) {
    // 简化了$options的处理
    this.$options = options;
    // 简化了对data的处理
    let data = (this._data = this.$options.data);
    // 将所有data最外层属性代理到Vue实例上
    Object.keys(data).forEach(key => this._proxy(key));
    // 监听数据
    observe(data);
  }
  // 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者
  $watch(expOrFn, cb) {
    new Watcher(this, expOrFn, cb);
  }
  _proxy(key) {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get: () => this._data[key],
      set: val => {
        this._data[key] = val;
      },
    });
  }
}
```

**Object.defineProperty 的缺陷**
- 无法监听数组变化
  Vue 中对以下数组方法做了处理，但是仍旧存在其他不能处理数组的情况
  ```js
  push()
  pop()
  shift()
  unshift()
  splice()
  sort()
  reverse()
  ```
- 只能劫持对象的属性：我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历

> Proxy

它在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写

- Proxy可以直接监听对象而非属性

Proxy 直接可以劫持整个对象,并返回一个新对象,不管是操作便利程度还是底层功能上都远强于 `Object.defineProperty`

- Proxy可以直接监听数组的变化

Proxy不需要那么多 hack（即使hack也无法完美实现监听）就可以无压力监听数组的变化,我们都知道,标准永远优先于hack。

- Proxy 有多达13种拦截方法,不限于 apply、ownKeys、deleteProperty、has等等是 Object.defineProperty 不具备的。

- Proxy 的劣势就是兼容性问题

----------------

- Object.defineProperty无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；
- Object.defineProperty只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy可以劫持整个对象，并返回一个新的对象。
- Proxy不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。


栈溢出情况：
```js
var person = { a:1 } // 注:里面的this指向ogj(person) 
Object.defineProperty(person,'a', { 
  get() { 
    return this.a 
  }, 
  set(val) { 
    this.a = val 
  }
}) 
// person.a //Uncaught RangeError: Maximum call stack size exceeded 
// 什么,溢出了?这是为什么? 
// 哦~原来是这么写的话会造成循环引用,狂call不止 
// 我们看下流程: 
// person.a → get.call(person) → this.a → person.a → get.call(person) → this.a.....
```

我们得改成 
```js
var person = { a:1 } 
Object.defineProperty(person,'a', { 
  get() { 
    return this._a || 1 //定义一个新的属性和一个默认值 
  }, 
  set(val) { 
    this._a = val
  } 
}) 
person.a // 1 
person.a = 2 // 2 
person.a // 2
```