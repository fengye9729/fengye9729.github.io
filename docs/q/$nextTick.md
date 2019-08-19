# $nextTick

```js
`Vue.nextTick([callback, context])`
`vm.$nextTick([callback])`
```

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据后立刻调用它，获取更新后的 DOM。
Vue 的响应式并不是数据变化后 DOM 立即变化，而是按照一定的策略进行 DOM 的更新。

Vue 异步执行 DOM 更新。只要观察到数据变化， Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。
在下一个的事件循环 tick 时，Vue 刷新队列并执行实际（已去重的）工作。

Vue 在内部尝试对异步队列使用原生的 `Promise.then` 和 `MessageChannel`，如果环境不支持，则降级使用 `setTimeout(fn, 0)`

虽然 Vue.js 鼓励开发人员沿着数据驱动的方式思考，避免直接操作 DOM，但是有时候需要操作 DOM。为了在数据变化后操作更新后的 DOM ,可以在数据变化后立即调用 Vue.nextTick()，这样回调函数在 DOM 更新完成之后调用。

JS 的运行机制：JS 是单线程的，基于事件循环的。

- 所有的同步任务都在主线程上执行，形成一个执行栈
- 主线程之外，还存在一个任务队列。只要异步任务有了运行结果，就在任务队列里放置一个事件
- 一旦执行栈中所有的同步任务执行完毕，系统会自动读取任务队列。任务队列的异步任务，结束等待状态，进入执行栈，开始执行
- 主线程不断重复以上三步

主线程的执行过程就是一个 tick ，所有的异步结果都是通过任务队列来调用。消息队列中存放着一个个的任务（task）。task 分为两大类: microtask 和 macrotask，并且每个macrotask 执行完后，都要清空所有的 microtask

```js
for (macroTask of macroTaskQueue) {
  // 1. Handle current MACRO-TASK
  handleMacroTask();
    
  // 2. Handle all MICRO-TASK
  for (microTask of microTaskQueue) {
      handleMicroTask(microTask);
  }
}
```

在浏览器环境中，

- 常见的 macrotask: setTimeout 、setImmediate 、MessageChannel 、postMessage
- 常见的 microtask: MutationObsever 和 Promise.then

```js
vm.msg = '修改了数据'
// DOM 尚未更新
Vue.nextTick(function() {
  // DOM 更新了
})
```

**为什么在 nextTick 的回调函数里能够操作「更新后的 DOM」呢？**

**UI Render 是在哪一步执行的？**

这里比较有趣的是 Vue2.5 之前使用的是 `MutationObserver`

Vue2.5 使用 `MessageChannel`

Vue2.6 又改回了 `MutationObserver`

而无论是使用 MutationObserver 还是使用 MessageChannel ，重点是 JS 的运行机制

并不是使用 MO 来监听 DOM 的修改，只是想要一个异步 API ，用来在当前的同步代码执行完毕后，执行需要执行的异步回调。