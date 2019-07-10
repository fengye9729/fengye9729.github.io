# React 事件机制

React 不仅构建了虚拟 DOM，还构建了自己的事件系统。React 未将事件处理函数与对应的 DOM 节点直接关联，React 元素的事件处理实际上是代理到 document 上。React 在 document 上绑定了 `dispatchEvent` 事件，使用一个全局事件监听器监听所有的事件。

React 元素的事件处理与 DOM 事件处理类似
不同点：
- 在 DOM 事件处理上，使用 `e` 属性获取事件； React 元素的事件处理，使用 `e.nativeEvent` 属性获取**浏览器底层**事件
- 语法上：
  - React 事件名采用小驼峰式
  - 使用 JSX 时，需要传入一个函数作为事件处理函数而不是字符串
- 不能通过返回 `return false` 阻止默认行为，必须显示的使用 `preventDefault`