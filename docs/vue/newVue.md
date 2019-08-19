# new Vue() 发生了什么？
模板和数据如何渲染成最终的 DOM?
```js
<div id="app">
  {{ message }}
</div>
---------------------
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

- new 实例化一个对象，Vue 是一个类，类在JS 中是用 Function 实现的
- Vue 通过 new 关键字初始化，然后调用 `this._init()` 方法，Vue 初始化做了这些事情：
  合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher等等
- Vue 的初始化逻辑写的很清楚，把不同的功能逻辑拆成一些单独的函数执行，让主线逻辑一目了然。
- 初始化的最后，检测到如果有 el 属性，则调用 `vm.$mount` 方法挂载 vm，**挂载的目标就是把模板渲染成最终的 DOM**