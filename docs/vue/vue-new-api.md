# Vue 新增 API

### `Vue.observable( object )`

[2.6.0 新增](https://cn.vuejs.org/v2/api/#Vue-observable)

在 Vue 中，推荐在使用实例前，就声明所有的根级响应式属性。而在 Vue2.6 版本中新增了 `Vue.observable` 全局API，用于让一个对象可响应。目的是为了伴随着 Vue3 的问世，向前兼容。

返回的对象可以直接用于**渲染函数**和**计算属性**内，并且会在发生改变时触发相应的更新。【注意，用在 data 中，是不能被响应式更新的】

*研究下 `Vue.observable` 的结构*