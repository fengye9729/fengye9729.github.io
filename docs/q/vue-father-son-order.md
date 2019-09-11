# Vue 的父组件和子组件生命周期钩子执行顺序是什么

- 加载渲染过程
  - 父 beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted
- 子组件更新过程
  - 子beforeUpdate -> 子updated
- 父组件更新过程（更新的数据与子组件无关)
  - 父beforeUpdate -> 父updated
- 父组件销毁（不同情况下不一，有争议）
  - 父beforeUpdate -> 子beforeDestroy -> 子destroyed -> 父updated

> 为什么子组件修改数据触发 update 事件后，父组件并不会触发 update 事件？

改变子组件的数据是不会触发父组件的钩子的，Vue 通信是单向的。
父组件通过 props 向子组件传递信息，子组件能知道父组件状态变化，子组件的状态变化父组件是不知道的。