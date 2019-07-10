# Vue 基础知识点

### 对于MVVM的理解？
[传送门](./mvvm.md)



### 生命周期分析

生命周期钩子有以下：
- beforeCeate
- created: 实例创建后立即被调用，可以放 loading 加载标志
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed
- activated
- deactivated
- errorCaptured

### computed，watch，methods之间的区别

computed：计算属性
watch: 侦听属性
methods: 方法


### v-if 和 v-show 的区别

`v-show` 只是 `display: none` 和 `display: block` 之间的 css 切换，DOM 一直在。`v-show` 有很高的初始渲染开销，切换开销小
`v-if` 切换时会触发**销毁|挂载** 组件，切换开销大。


### for 加 key 的目的是什么

基于 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时使用 `key` 来辨识 `VNodes`   

如果不使用 `key`，在更新已渲染的元素列表时，会默认采用"就地复用"策略。当数据项发生改变时，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是简单的复用每个元素。这个默认的模式是高效的。

为了给 Vue 一个提示，以便跟踪每个节点的身份，从而重用和重新排序现有元素，需要使用 `key`

使用 `key`，它会基于 `key` 的变化重新排序元素顺序，并且会移除不存在的元素。



**`key` 使用场景**:

- 结合 `v-for` 渲染列表元素
- 强制替换元素/组件而不是重复使用它
  - 完整的触发组件的生命周期钩子
  - 触发过渡 (在使用相同标签名的元素过渡切换时，使用 key，为了让 Vue 区分它们，否则 Vue 只会替换内部属性而不会触发过渡效果)



**`key` 注意事项**：

- 尽可能的不要使用 index 作为 key 值 (因为 index 值会改变，这样重新渲染的列表项变多，影响性能)
- 不要使用数组或对象之类的非原始值作为 key 值，用字符串或者数值类型的值



### 组件中 data 什么时候可以使用对象

组件可以进行任意次数的复用，每用一个组件，都会有一个新的实例被创建。

组件的 `data` 设置为函数，是希望每个实例可以维护一份被返回对象的独立的拷贝。

组件可能被用来创建多个实例，当组件的 `data` 是对象时，所有的实例将共享引用同一个数据对象，修改一个实例的 `data` ，会影响到其他实例。

通过使用 `data` 函数，可以在每个创建实例后，调用 `data` 函数，返回初始数据的一个全新副本数据对象。

当使用 `new Vue()` ，data 设置为「对象」或者「函数」都是可以的，因为根组件不会复用，也就不存在共享 `data` 的情况

```js
function Person() {
	
}
Person.prototype.data = {
	a: 1,
	b: 'hello'
}

var p1 = new Person()
var p2 = new Person()

p1.data.a = 2
console.log("p2 = ", p2.data.a) // p2 = 2 如果 data 是一个对象，那么一个实例修改后，另一个实例也会被影响

Person.prototype.data2 = function() {
	return {
		a: 1,
		b: 'hello'
	}
}
var p3 = new Person()
var p4 = new Person()
p3.data2().a = 2
console.log("p4 = ", p4.data2().a) // p4 = 1 如果 data 是一个函数，那么一个实例修改后，其他实例不会被影响
```

### render函数是什么


### 虚拟dom的更新机制


### keep-alive 组件有什么作用


### 组件通信


### extend 能做什么


### mixin 和 mixins 区别

