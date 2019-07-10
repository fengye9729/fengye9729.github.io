# $forceUpdate() 的实际使用场景

> 定义

`$forceUpdate` 用于迫使 Vue 实例重新渲染。仅仅影响 Vue 实例本身和插入插槽内容的子组件，并不是所有子组件。

```js
// 源码
Vue.prototype.$forceUpdate = function () {
  const vm: Component = this
  if (vm._watcher) {
    vm._watcher.update()
  }
}
```

这个方法用到的情况很少，需要手动强制更新的场景下，使用 `$forceUpdate()` 

> 使用场景