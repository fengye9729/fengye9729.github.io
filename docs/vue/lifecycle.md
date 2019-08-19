# Vue 生命周期
> 每个 Vue 实例在被创建时都要经历一系列的初始化过程。

例如需要设置数据监听、模板编译、挂载实例到 DOM、在数据变化时更新 DOM等等。

在这个过程中会运行一些生命周期钩子的函数，给与用户机会在不同阶段添加自己的代码。

生命周期钩子中的 `this` 上下文指向调用它的 Vue 实例

## beforeCreate & created
```js
Vue.prototype._init = function (options?: Object) {
  // ...
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm) // resolve injections before data/props
  initState(vm)
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')
  // ...
}
```
`initState` 的作用是：初始化 props data methods watch computed 等属性

所以 beforeCreate 的钩子函数中就不能获取 props data 中定义的值，也不能调用 methods 中定义的方法

这两个钩子函数执行的时候，并没有渲染 DOM，所以我们不能访问 DOM。挂载阶段还没开始，`$el` 不可见。

🌹 使用场景：

- 组件加载的时候需要和后台交互，那么放在 `beforeCreate` 和 `created` 都可以
- 需要访问 props data 等数据的话，使用 `created` ，「简单的 ajax 请求」
- 这两个生命周期钩子常常用来初始化 「非响应式属性」
- VueRouter 的 install 方法里，全局混入，`beforeCreate` 钩子函数下将 VueRouter 对象实例注入 Vue 实例中

## beforeMount & mounted
`beforeMount` 挂载之前被调用

`mounted`  el 被新创建的 vm.$el 替换，挂载到实例上去后调用 `mounted`

此时可以访问到 DOM

`mounted` 不会承诺所有的子组件一起被挂载。

- beforeMount 钩子好像没啥实际使用场景诶


## beforeUpdate & updated
`beforeUpdate` 发生在虚拟 DOM 打补丁前，适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。

- data 更新了，但是 虚拟 DOM 还未更新 —-beforeUpdate

`updated` 由于数据的更改导致虚拟 DOM 重新渲染和打补丁，在这之后调用该钩子。


## beforeDestroy & destroyed
`beforeDestroy` 实例销毁之前

`destroyed` 实例销毁之后，调用后，Vue 实例所有的东西都解绑，所有的事件监听器被移除，所有的子实例被销毁。

(定时器销毁工作）

- beforeDestroy : 适用于定时器的销毁
- destroyed 这时候实例被**销毁**，被销毁意味着什么呢 ？在执行 destroyed 方法后，对 data 里面属性的改变不会再出发生命周期钩子，意味着那个响应式属性已经不是响应式了，Vue 实例解除了事件监听与 DOM 的绑定，不过 DOM 元素还在。

## activated & deactivated
## errorCaptured