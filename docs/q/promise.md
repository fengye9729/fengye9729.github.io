# Promise

### 大纲
- 常见的异步解决方案
- 回调函数存在一系列问题
- Promise 基本情况
- ajax 的实现
- Promise.race 以及应用场景
- Promise.all 以及应用场景

![](../images/promise.jpg)

**常见的异步解决方案**
- 回调函数
- 事件监听
- 发布订阅
- Promise

**回调函数存在一系列问题**
- 回调嵌套
- 回调执行多次或者没有执行
- 回调有时同步有时异步
- 回调地狱
  - 代码臃肿
  - 可读性差
  - 耦合性高，可维护性差
  - 代码复用性差
  - 异常只能在回调里处理

### Promise 基本情况
> Promise用于表示一个异步操作的最终状态（失败|成功）以及其返回的值。


```js
new Promise(function(resolve, reject){})
// 一个Promise 有三个状态 pending fulfilled rejected
```
`Promise.prototype.then` 和 `Promise.prototype.catch` 方法返回promise 对象，所以它们可以被链式调用。

> Promise 本质是一个状态机

每个Promise只能是3中状态的一种：`pending 、fulfilled、rejected`
状态转变只能是 `pending->fulfilled | pending->rejected` 状态不可逆，
then 方法**必须返回一个** Promise

> Promise 是一个构造函数，需要用 new 调用

- Promise 构造函数有 `all race reject resolve` 方法, 最新提案中多了 `allSettled`
- `new Promise` 后的「Promise实例」有 `catch finally then` 方法

  优点：
  - Promise, 可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
  - Promise 提供了统一的接口，使得控制异步操作容易

  缺点：
  - 无法取消 Promise
  - 如果不设置回调函数，内部的报错不会反应到外部
  - 当处于 pending 状态，无法知道进行到哪个阶段（刚开始还是即将完成）

### ajax 的实现

```js
var result = ''
var url = ''

var XHR = new XMLHttpRequest()

XHR.open('GET', url, true)
XHR.send()

XHR.onreadystatechange = function() {
  if(XHR.readyState == 4 && XHR.status == 200) {
    result = XHR.response
    console.log(result)
  }
}
```

### Promise.race 以及应用场景
`const p = Promise.race([p1,p2,p3])`

Promise.race 将多个 Promise 实例，包装成一个新的 Promise 实例

只要 p1 p2 p3 之间有一个实例率先改变状态， p 的状态就跟着改变。率先改变的 Promise 实例的返回值，传给 P 的回调函数
```js
// 场景1
var p1 = new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve('abcde')
  }, 3000)
})

var p2 = new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve('hello, promise')
  }, 1000)
})
var p = Promise.race([p1, p2])
        .then(rr => {
          console.log(rr)
        })
        .catch(error => {
          console.log(error)
        })
// P2 先进入resolve，改变状态，将 'hello, promise'传给 p 的回调，输出 hello,promise
// 注意，P1 也是会执行的，resolve('abcde') 这一步操作同样进行，只是不会将这个状态传递给 p 了


// 场景2：「指定时间内接口没有获得结果，就将 Promise 状态变为 reject」
var p1 = new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve('abcde')
  }, 3000)
})

var p2 = new Promise((resolve, reject) => {
  setTimeout(function() {
    reject(new Error('request timeout'))
  }, 1000)
})
var p = Promise.race([p1, p2])
        .then(rr => {
          console.log(rr)
        })
        .catch(error => {
          console.log(error)
        })
// p2 进入 reject，将状态传给 p 的回调，输出 request timeout
// p1 会执行，resolve('abcde') 这一步会执行，只是不会将状态传给 p 回调
```

> 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）

```js
function red() {
  console.log("red");
}

function green() {
  console.log("green");
}

function yellow() {
  console.log("yellow");
}

var timer = function(time, cb) {
  return new Promise(function(resolve) {
    setTimeout(() => {
      resolve(cb());
    }, time);
  });
};

var p = new Promise(function(resolve) {
  resolve();
});

var loop = function(func) {
  func
    .then(() => {
      return timer(3000, red); // 注意return 的重要性
    })
    .then(() => {
      return timer(2000, yellow);
    })
    .then(() => {
      return timer(1000, green);
    })
    .then(() => {
      loop(func);
    });
};

loop(p);
```

容易错写成以下方式
- 不能循环输出
- 代码冗余
- 输出结果错误 输出了 green yellow red

```js
// 错误思路
function red() {
  console.log("red");
}

function green() {
  console.log("green");
}

function yellow() {
  console.log("yellow");
}

new Promise(function(resolve) {
  resolve()
})
  .then(() => {
    setTimeout(() => {
      red()
    }, 3000)
  })
  .then(() => {
    setTimeout(() => {
      yellow()
    }, 2000)
  })
  .then(() => {
    setTimeout(() => {
      green()
    }, 1000)
  })
```

### Promise.all 以及应用场景
`Promise.all` 用于将多个 `Promise` 实例，包装成一个新的 `Promise` 实例

`var p = Promise.all([p1,p2,p3])`

- 接收一个数组作为参数，p1 p2 p3 都是 Promise 实例；如果不是，会先调用 `Promise.resolve` 方法，将参数转成 Promise 实例再处理。（注意：参数不一定是数组，但**必须是具有 Iterator 接口**，返回的每个成员都是 Promise 实例）
- p 的状态由 p1 p2 p3共同决定
    - 1） p1 p2 p3 都是 fulfilled ， 那么 p 为 fulfilled，此时 p1 p2 p3 的返回值组成一个数组，传给 P 的回调函数
    - 2） p1 p2 p3 有一个被 rejected , 那么 p 为 rejected ，此时第一个被 rejected 的实例的返回值，传给 P 的回调函数
- 如果作为参数的 Promise 实例，自己定义了 catch 方法，那么一旦被 rejected ，并不会触发 `Promise.all()` 的 `catch` 方法

> Promise.all 图片并行加载，当所有图片加载完成后，再将所有图片一起展示

```js
function loadImg(src) {
  return new Promise((resolve, reject) => {
    var img = new Image();

    img.onload = function() {
      resolve(img);
    };

    img.onerror = function(err) {
      reject(err);
    };

    img.src = src;
  });
}

function showImg(imgs) {
  imgs.forEach(img => {
    document.getElementById("images").appendChild(img);
  });
}

Promise.all([
  loadImg(""),
  loadImg(""),
  loadImg(""),
  loadImg("")
]).then(showImg);
```

> 网页中预加载20张图片资源，分步加载，一次加载10张，两次完成，怎么控制图片请求的并发，怎样感知当前异步请求是否已完成？

### Promise.allSettled

Adds Promise.allSettled(), which returns a promise that is fulfilled with an array of promise state snapshots, but only after all the original promises have settled, in other words after it has either fulfilled or rejected.

```js
var p1 = Promise.resolve('---p1--')
var p3 = Promise.resolve('---p3--')
var p = Promise.all([p1, p3]).then(v => {
	console.log(v)
})
// ["---p1--", "---p3--"]

var pp = Promise.allSettled([p1, p3]).then(v => {
	console.log(v)
})
// [{status: "fulfilled", value: "---p1--"}, {status: "fulfilled", value: "---p3--"}]

var p2 = Promise.reject('出错了')
var p = Promise.all([p1, p2]).then(v => {
	console.log(v)
})
// Uncaught (in promise) 出错了

var p = Promise.all([p1, p2]).then(v => {
	console.log(v)
})
// [{status: "fulfilled", value: "---p1--"}, {status: "rejected", reason: "出错了"}]
```

[promise-fun](https://github.com/sindresorhus/promise-fun)