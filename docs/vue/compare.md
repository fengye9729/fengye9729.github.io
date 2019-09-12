# Vue.js 是什么？与传统框架，其他框架的差别
Vue 是一套用于构建用户界面的渐进式框架。Vue 被设计成可以自底向上逐层应用。

Vue 的核心库只关心视图层，易于上手，易与第三方库或者既有项目整合。

React 和 Vue 有很多相似之处
- 使用 Virtual DOM
- 提供了 响应式（Reactive) 和 组件化（Composable) 的视图组件
- 将注意力关注在核心库，对于其他功能比如路由和全局状态管理交给社区相关的库
- 两者运行时性能都很高

jQuery 直接操作 DOM 对象，对其进行取值赋值事件绑定操作，与原生 JS 的差别在于更加方便的操作 DOM 对象，可是数据和界面是高度耦合的。

Vue 将 Model 和 View 分离开，对数据的操作不需要直接操作 DOM