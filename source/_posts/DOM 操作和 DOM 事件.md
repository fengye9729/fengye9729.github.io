---
title: DOM 操作和 DOM 事件
date: 2018-05-31
tags: 
- ES5
---
## DOM 操作

来源：[DOM 操作](https://kb.hcysun.me/#/note/dom/dom?id=document-createelementtagname)
+ 节点属性 / 节点方法
+ 文档节点属性 / 文档节点方法
+ 元素节点属性 / 元素节点方法
+ 几何量与滚动几何量属性 / 方法
+ 文本节点属性 / 文本节点方法

## DOM 事件

来源: [DOM 事件](https://kb.hcysun.me/#/note/dom/dom-event?id=%E9%BC%A0%E6%A0%87%E4%BA%8B%E4%BB%B6%E5%AF%B9%E8%B1%A1%E4%B8%AD%E7%9A%84%E4%BD%8D%E7%BD%AE%E4%BF%A1%E6%81%AF%EF%BC%9A)

### 绑定事件方法

- HTML 内敛属性绑定 `<div onclick="alert('hello world')"></div>`
- js获取DOM元素添加事件属性 `document.getElementById('box').onclick = function (){...}`
- 使用 addEventListener()

```js
el.addEventListener(eventName, handle, useCapture | options)
el.removeEventListener(eventName, handle)
```

### 事件流

- 事件流
- 事件冒泡
- 事件捕获

### 事件对象

- event.currentTarget
- event.target
- event.preventDefault()
- event.stopImmediatePropagation()

### 事件类型

- UI事件
    - load
    - resize
    - scroll
- 焦点事件
    - focus
    - blur
- 鼠标与滚轮事件
    - click
    - mouseup
    - mouseenter/mouseleave 与 mouseover/mouseout
    - event.clientX/Y
    - event.pageX/Y
- 键盘事件
    - keydown
    - keypress
    - keyup
- 文本事件
    - textInput
- HTML5事件
    - cobtextmenu
    - beforeunload
    - DOMcontentLoaded

## 区别

> 事件 捕获、目标、冒泡阶段

页面中接收事件的顺序。分为三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段

`事件捕获`: 不太具体的节点(或嵌套层次最浅的节点，通常是document)应该最先接收事件，然后沿DOM树依次向子代节点传递直到一个具体的子节点

`目标阶段`： 处在绑定事件的元素上

`事件冒泡`: 事件首先由嵌套层次最深的节点接收，然后沿DOM树依次逐级向父代节点传播。

> 事件委托

因为事件具有冒泡机制，因此我们可以利用冒泡的原理，把事件加到父级上，触发执行效果。为了提高性能。通过`event.target.nodeName`判断子元素

```js
<div>
    <ul id = "bubble">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
</div>
window.onload = function () {
    var aUl = document.getElementsById("bubble");
    var aLi = aUl.getElementsByTagName("li");

    //不管在哪个事件中，只要你操作的那个元素就是事件源。
    // ie：window.event.srcElement
    // 标准下:event.target
    aUl.onmouseover = function (ev) {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;

        if(target.nodeName.toLowerCase() == "li"){
            target.style.background = "blue";
        }
    };
};
```

> target 和 currentTarget

+ target 在事件流的目标阶段；currentTarget 在事件流的捕获、目标及冒泡阶段
+ 当事件流处在目标阶段时，两者的指向是一致的
+ 处于捕获和冒泡阶段，target 指向被单击的对象(真正触发事件的元素)；currentTarget 指向当前事件活动的对象(父级),currentTarget的值始终等于 this，即指向事件所绑定到的元素