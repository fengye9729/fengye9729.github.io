# 基于 nextTick 研究 Vue 响应式原理之异步更新队列

```js
Vue.nextTick( [callback, context] )
vm.$nextTick( [callback] )
```

定义：在下一次 DOM 更新循环结束之后执行延迟回调。在修改数据后立即执行该方法，获取更新后的 DOM.

注意：如果没有提供回调且在支持 Promise 的环境中，则返回一个 `Promise`

## Vue 响应式原理之异步更新队列

Vue 的响应式并不是数据更新后 DOM 立即变化，而是根据一定的策略进行 DOM 更新。

Vue 异步执行 DOM 更新。
只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。

虽然 Vue 鼓励开发者通过**数据驱动**的方式思考，避免直接操作 DOM，但是有时候需要直接操作 DOM。为了在数据变化后等待 Vue 更新完成 DOM，可以在数据变化之后立即使用 `Vue.nextTick(callback)`。这样回调函数将在 DOM 更新完成后被调用。

## 再聊 JS 执行机制
JS 是单线程语言，基于事件循环的。
- 所有的同步任务都在主线程执行，形成一个执行栈
- 主线程之外，还存在一个任务队列。只要异步任务有了运行结果，就在任务队列里放置一个事件
- 一旦执行栈中所有的同步任务执行完毕，系统就会自动读取任务队列。任务队列的异步任务，结束等待状态，进入执行栈，执行
- 主线程不断重复以上三步

主线程的执行过程就是一个 tick，所有的异步任务都是通过任务队列来调用。消息队列中存放着一个个的任务（task)。

task 分为两大类：microtask 和 macrotask，并且每个 macrotask 执行完后，都要清空所有的 microtask
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
在浏览器环境中，常见的宏任务与微任务如下：
- microtask：MutationObsever 和 Promise.then
- macrotask：setTimeout 、setImmediate 、MessageChannel 、postMessage

这里比较有趣的是 Vue2.5 之前使用的是 `MutationObserver`，
Vue2.5 使用 `MessageChannel`，
Vue2.6 又改回了 `MutationObserver`。

而无论是使用 `MutationObserver` 还是使用 `MessageChannel `，重点是 JS 的运行机制。
并不是使用 MO 来监听 DOM 的修改，只是想要一个异步 API ，用来在当前的同步代码执行完毕后，执行需要执行的异步回调。

## 补充
[Vue 2.6 发布了](https://zhuanlan.zhihu.com/p/56260917) --- nextTick 重新调整为全部使用 Microtask

在 2.5 当中我们引入了一个改动，使得当一个 v-on DOM 事件侦听器触发更新时，会使用 Macrotask 而不是 Microtask 来进行异步缓冲。这原本是为了修正一类浏览器的特殊边际情况导致的 bug 才引入的，但这个改动本身却导致了更多其它的问题。在 2.6 里面我们对于原本的边际情况找到了更简单的 fix，因此这个 Macrotask 的改动也就没有必要了。现在 nextTick 将会统一全部使用 Microtask。

## Reverting nextTick to Always Use Microtask
[Reverting nextTick to Always Use Microtask](https://gist.github.com/yyx990803/d1a0eaac052654f93a1ccaab072076dd)

### 最原始的问题
当 Vue 检测到数据变动，它在下一个 tick 中异步执行 DOM 更新，因此多个突变只会触发一个更新。在 2.5 版本之前，Vue 一直使用 Microtask 延迟更新。

这在大多数情况下运行良好，但我们发现了一个边缘情况：
1. 提供两个嵌套元素，"outer" 和 "inner";
2. "inner" 有一个触发更新的单机事件处理程序
3. 更新将另一个单击事件侦听器附加到"outer"
步骤3，在 microtask 执行时，在单击事件冒泡到“外部”之前发生；因此，“外部”上的事件侦听器是由导致它被附加的相同事件触发的。
这是一种非常罕见的边缘情况，但是当用户遇到它时，很难弄清楚发生了什么。

### Macrotask 在 2.5 版本中的应用
在2.5.0中，为了解决这个边缘情况，我们改变了 nextTick 的内部实现，在事件处理程序中触发更新时，使用宏任务而不是微任务。然而，这一改变实际上带来了更多的问题，超过了修复带来的好处。

### 2.6 恢复 Microtask 以及潜在的副作用
在 2.6，我们设法为边缘情况找到了一个更简单的修复方法，它允许我们在所有情况下都恢复使用微任务。

。。。