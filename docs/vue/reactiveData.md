# data 里定义的属性都是响应式属性吗？

早上看到一篇文章[一个Vue引发的性能问题](https://zhuanlan.zhihu.com/p/60247956), 作者在文章中说「实验过只要挂到this就会加setter」当场被尤大否定。
于是我查阅官网，看到[这话段](https://cn.vuejs.org/v2/api/#data)

> 以 _ 或 $ 开头的属性 不会 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API >方法冲突。你可以使用例如 `vm.$data._property` 的方式访问这些属性。

举个栗子，假设我们在 Vue 的项目中引用地图组件 `echart`，按往常我会这样写
```js
data: function() {
  return {
    map: new echart()
  }
}
```
如果是这种写法的话，vue 会遍历这个 map 对象，给所有的属性加上 getter/setter,于是性能大大降低。
而以 _ 或 $ 开头的属性 不会 被 Vue 实例代理，于是这个属性不能直接通过 `this.` 调用。