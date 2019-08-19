# EventEmitter
我们经常使用 `addEventListener` 来为 DOM 添加事件(click tap mousemove)
一个事件是一种行为，当这个事件发生的时候，去执行一些动作。
对应到代码中，即为行为的名称与函数的集合。

把事件抽象成一个类，类的属性和方法如下：
```js
_events                               一个对象 {key: eventName, value: Array<Function,Function...>}
$on(eventName, func)                  添加具体事件的处理函数
$off(eventName)                       取消事件处理函数
$emit(eventName, org1, org2, ...)   用于触发事件
$once(eventName, func)                设置仅触发一次的事件
```

**事件管理类**
```js
// Event.mjs
let uid = 0;

export class Event {
  constructor() {
    this.id = ++uid;
    this._events = {};
  }

  $on(eventName, fn) {
    let ctx = this;
    // 若 _events 对象下无对应事件名，则新建一个数组，然后将处理函数推入数组
    if (!ctx._events[eventName]) {
      ctx._events[eventName] = [];
    }
    ctx._events[eventName].push(fn);
    return ctx;
  }

  $once(eventName, fn) {
    let ctx = this;

    function on() {
      // 先取消，然后触发，确保仅触发一次
      ctx.$off(eventName, on);
      fn.apply(ctx, arguments);
    }

    on.fn = fn;
    ctx.$on(eventName, on);
    return ctx;
  }

  $off(eventName) {
    let ctx = this;
    const cbs = ctx._events[eventName];
    if (cbs) {
      // 取消置空即可
      ctx._events[eventName] = null;
    }
    return ctx;
  }

  $emit(eventName, ...args) {
    let ctx = this;
    let cbs = ctx._events[eventName];
    if (cbs) {
      cbs.forEach(func => func.apply(ctx, args));
    }
    return ctx;
  }
}
```

**测试这个类**
```js
// test.mjs
import { Event } from "./Event";

let eventTest = new Event();

eventTest.$on("testEvent", function(event) {
  console.log("测试事件添加，传入参数为" + event);
});

eventTest.$emit("testEvent", "事件触发成功");
// 测试事件添加，传入参数为事件触发成功

eventTest.$emit("testEvent", "事件再次触发成功");
// 测试事件添加，传入参数为事件再次触发成功

eventTest.$off("testEvent");

eventTest.$emit("testEvent", "事件取消，不会有输出");
// 无输出

eventTest.$once("testOnce", function(event) {
  console.log("事件仅仅触发一次，传入参数为" + event);
});

eventTest.$emit("testOnce", "事件触发成功");
// 事件仅仅触发一次，传入参数为事件触发成功

eventTest.$emit("testOnce", "事件取消，不会有输出");
// 无输出


// node --experimental-modules test.mjs
```

**优化事件管理类**
- 方便为多个事件添加同一个函数
- 方便为一个事件添加多个函数
- 有针对的取消事件的函数

```js
// 优化后的 on 事件
$on(eventName, fn) {
  let ctx = this
  // 处理事件名是数组的情况
  if (Array.isArray(eventName)) {
      // 递归调用 $on 函数
      eventName.forEach(name => this.$on(name, fn))
  } else {
      // 处理函数为数组的情况
      // 将处理函数统一成数组方便添加
      if (!Array.isArray(fn)) {
          fn = [fn]
      }
      if(!ctx._events[eventName]){
          ctx._events[eventName] = []
      }
      ctx._events[eventName].push(fn)
  }
  return ctx
}
```

**之前的 off 事件**
```js
$off(eventName) {
  let ctx = this
  const cbs = ctx._events[eventName]
  if (cbs) {
    // 取消置空即可
    ctx._events[eventName] = null
  }
  return ctx
}
```

只能清空特定事件，优化的思路为
- 清空所有事件
- 清空多个事件
- 取消特定事件的特定处理函数

```js
$off(eventName, fn) {
  let ctx = this
  // 清空所有事件
  if (!arguments.length) {
      ctx._events = Object.create(null)
      return ctx
  }
  // 清空多个事件
  if (Array.isArray(eventName)) {
      eventName.forEach(name => this.$off(name, fn))
      return ctx
  }
  // 若没有事件对应的函数列表则不用处理
  const cbs = ctx._events[eventName]
  if (!cbs) {
      return ctx
  }
  // 清空特定事件
  if (!fn) {
      ctx._events[eventName] = null
      return ctx
  }
  // 取消特定事件的特定处理函数
  if (fn) {
      let cb
      let i = cbs.length
      // 处理一次取消多个的情况
      if (Array.isArray(fn)) {
          fn.forEach(fnc => this.$off(eventName, fnc))
      }
      while (i--) {
          cb = cbs[i]
          if (cb === fn || cb.fn === fn) {
              cbs.splice(i, 1)
              break
          }
      }
  }
  return ctx
}
```

**测试优化后的类**
```js
import {Event} from "./Event";
 
let eventTest = new Event()
 
eventTest.$on('eventName1', (e) => {
    console.log('一次添加一个处理函数')
    console.log(e)
})
 
eventTest.$on('eventName2', [(e) => {
    console.log('一次添加多个处理函数，第一个')
    console.log(e)
}, (e) => {
    console.log('一次添加多个处理函数，第二个')
    console.log(e)
}])
 
eventTest.$on(['eventName3', 'eventName4'], (e) => {
    console.log('多个事件添加同一处理函数')
    console.log(e)
})
 
eventTest.$on(['eventName5', 'eventName6'], [(e) => {
    console.log('多个事件添加多个处理函数，第一个')
    console.log(e)
}, (e) => {
    console.log('多个事件添加多个处理函数，第二个')
    console.log(e)
}])
 
eventTest.$emit('eventName1', '传入参数1')
// 一次添加一个处理函数
// 传入参数1
eventTest.$emit('eventName2', '传入参数2')
// 一次添加多个处理函数，第一个
// 传入参数2
// 一次添加多个处理函数，第二个
// 传入参数2
eventTest.$emit('eventName3', '传入参数3')
// 多个事件添加同一处理函数
// 传入参数3
eventTest.$emit('eventName4', '传入参数4')
// 多个事件添加同一处理函数
// 传入参数4
eventTest.$emit('eventName5', '传入参数5')
// 多个事件添加多个处理函数，第一个
// 传入参数5
// 多个事件添加多个处理函数，第二个
// 传入参数5
eventTest.$emit('eventName6', '传入参数6')
// 多个事件添加多个处理函数，第一个
// 传入参数6
// 多个事件添加多个处理函数，第二个
// 传入参数6
console.log('------------------------------')
 
eventTest.$off('eventName1')
eventTest.$off(['eventName2', 'eventName3'])
 
eventTest.$emit('eventName1', '传入参数1')
// 无输出
eventTest.$emit('eventName2', '传入参数2')
// 无输出
eventTest.$emit('eventName3', '传入参数3')
// 无输出
eventTest.$emit('eventName4', '传入参数4')
// 多个事件添加同一处理函数
// 传入参数4
eventTest.$emit('eventName5', '传入参数5')
// 多个事件添加多个处理函数，第一个
// 传入参数5
// 多个事件添加多个处理函数，第二个
// 传入参数5
eventTest.$emit('eventName6', '传入参数6')
// 多个事件添加多个处理函数，第一个
// 传入参数6
// 多个事件添加多个处理函数，第二个
// 传入参数6
console.log('------------------------------')
 
eventTest.$off()
eventTest.$emit('eventName1', '传入参数1')
// 无输出
eventTest.$emit('eventName2', '传入参数2')
// 无输出
eventTest.$emit('eventName3', '传入参数3')
// 无输出
eventTest.$emit('eventName4', '传入参数4')
// 无输出
eventTest.$emit('eventName5', '传入参数5')
// 无输出
eventTest.$emit('eventName6', '传入参数6')
// 无输出
console.log('------------------------------')
```