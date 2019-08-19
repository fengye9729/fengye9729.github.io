# 事件操作

> 阻止冒泡和取消默认行为

```js
event.preventDefault() // 取消默认事件（阻止默认行为）
event.stopPropagation() // 阻止捕获和冒泡阶段中当前事件的进一步传播。
// ---------------
return false 
// 原生事件:取消默认事件，不会阻止冒泡事件
// 如果在jquery 下，取消默认事件，并且阻止冒泡
```

> addEventListener(???)

`EventTarget.addEventListener()` 将监听器注册到 `EventTarget` 上，当该对象触发指定的事件时，指定的回调函数就会被执行。事件目标可以是 Element Document Window 或者任何其他支持事件的对象。

```js
target.addEventListener(type, listener[, options]);
target.addEventListener(type, listener[, useCapture]);
```

- options
  - capture(Boolean) 表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
  - once(Boolean) 表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
  - passive(Boolean) 设置为true时，表示 listener 永远不会调用 preventDefault()
- useCapture(Boolean)
  - true 沿着DOM树向上冒泡的事件，不会触发listener
  - false(默认)

？？？