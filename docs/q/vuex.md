# 对 Vuex 的理解

本文的所有内容都是对官网内容的整理[官网](https://vuex.vuejs.org/zh/)
## Vuex 是什么？
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。

## 为什么需要 Vuex?
当应用里有多个组件需要共享状态时，单向数据流的简洁性很容易被破坏：
- 多个视图依赖于同一状态
  - 在多层嵌套的组件中，传参的方式十分繁琐，并且不能在兄弟组件间状态传递。
- 不同的视图需要变更同一状态
  - 我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。
  （这里应该指的是组件间通信方式，父->子 通过 props 传递，子->父 通过 $emit $on 事件）

以上的这些会导致无法维护的代码。
所以**将组件的共享状态抽取出来，以一个全局单例模式管理**。在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！
![](../images/vuex.png)

## 什么时候用 Vuex?
大型应用中，使用 Vuex 能够更好的管理状态；但是在小型项目里，使用 Vuex 会使得项目繁琐冗余，建议使用 **store 模式**。所以综合权衡利弊。
[store 模式---简单状态管理起步使用](https://cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8)
![](../images/state.png)
### Vuex.Store
```js
import Vuex from 'vuex'

const store = new Vuex.Store({ ...options })
```

### Vuex.Store 构造器选项
- state
- mutations
- actions
- getters
- modules
- plugin, strict, devtools

### Vuex.Store 实例属性
- state
- getters

### Vuex.Store 实例方法
- commit
- dispatch
- replaceState
- watch
- subscribe
- subscribeAction
- registerModule
- unregisterModule
- hotUpdate

### 组件绑定的辅助函数
- mapState
- mapGetters
- mapActions
- mapMutations
- createNamespacedHelpers

### Vuex 与全局对象的差异
- Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地**跟踪每一个状态的变化**，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。


### store 中的状态是响应式的:

- 在组件中调用 store 中的状态: 在计算属性中返回
- 触发变化: 在组件的 methods 中提交 mutation

### 组件仍旧保有局部状态
 
使用 Vuex 并不是意味着将所有的状态都放入 Vuex, 有些状态只属于某个组件，应该作为组件的局部状态。

### Getter 的应用

- Getter 接收 state 作为第一参数
- Getter 会暴露为 `store.getters` 对象
- Getter 可以返回一个值，或者返回一个函数 （*以下两点有点模糊*）
  - Getter **通过属性访问**时是作为响应式系统的一部分缓存的
  - Getter **通过方法访问**时，每次都会调用，而不会缓存结果

### 为什么需要 Getter?

当需要从 Store 中的 state 派生出一些状态的时候，我们需要写过滤函数。如果多个组件需要用到这些状态，我们要么每个组件中复制这个函数，要么抽取到一个共享函数然后每个组件中导入它。然而无论是哪种方式都不理想。

### Mutation

更改 Vuex 的 store 中的状态的唯一方法是**提交 mutation**。
每个 mutation 都有一个事件类型 type 和回调函数 handler。
这个回调函数就是状态进行更改的地方，它接收 state 为第一参数。

**不能直接调用 mutation handler**，而应该是 `store.commit('某个type')`

### Mutation 需遵循 Vue 的响应规则

- 最好提前在你的 store 中初始化好所有所需属性
- 当需要在对象上添加新属性时，你应该使用 `Vue.set(obj, 'newProp', 123)`, 或者以新对象替换老对象 `state.obj = { ...state.obj, newProp: 123 }`

### 使用常量替代 Mutation 事件类型

优势？
- 可以使 linter 之类的工具发挥作用
- 将这些常量放在单独的文件能够让代码合作者对整个 APP 包含的 mutation 一目了然
- 适用于大型合作型的项目

### Mutation 必须是同步函数

任何在回调函数中进行的状态的改变都是不可追踪的

*这个还需要再深入研究，为什么 Mutation 中不可以异步，而 Action 中可以*

### Action 区别与 Mutation

- Action 提交的是 Mutation,而不是直接修改状态
- Action 可以包含异步操作

### Action 的一些细节

Action 接收一个与 store 实例具有相同方法和属性的 context 对象，因此可以调用`context.commit` 来提交 Mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters

`store.dispatch` 方法触发 Action，在 Action 内部可以执行异步操作。

### 为什么 Action 的 context 不是 store 实例本身？
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。

因此每个模块的 Action 的 context 不是 store 实例本身。

### Module 命名空间
...稍微有丢丢复杂，官网多看几遍，栗子多使用使用

### Vuex 表单处理，在属于 Vuex 的 state 上使用 v-model？
`v-model` 是语法糖
```js
<input v-model="msg" />
// 等价于
<input :value="msg" @input="msg = $event.target.value">
```
因为在 Vuex 中修改 Store 中的状态的唯一方法是提交 mutation，所以使用 `v-model` 会报错。解决方式是使用带有 `setter` 的双向绑定计算属性
```js
<input v-model="message">
// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```