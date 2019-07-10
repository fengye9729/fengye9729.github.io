# 执行上下文

![execution-context](../.vuepress/public/images/context.jpg)

```js
var color = 'blue';

function changeColor() {
    var anotherColor = 'red';

    function swapColors() {
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
    }

    swapColors();
}

changeColor();
```
每当控制器转到可执行代码时，会进入一个「执行上下文」。

执行上下文可以理解为当前代码的执行环境，它会形成一个作用域。

在一个 JavaScript 程序中，存在多个执行上下文。JavaScript 引擎会以栈的方式处理它们，这个栈，即为「函数调用栈」
栈底是「全局上下文」，栈顶是「当前正在执行的上下文」。

JavaScript 执行环境包括三种情况
- 全局环境：JavaScript 运行起来就会进入这个环境
- 函数环境：当函数被调用执行时，会进入函数执行代码
- eval(不建议，忽略)

代码执行过程中，遇到以上三种情况，都会生成一个执行上下文，放入栈中。
处于栈顶的上下文执行完毕后，自动出栈。全局上下文在浏览器关闭后出栈。

> 注意：函数中遇到 `return` 能终止可执行代码的执行，因此会直接将当前执行上下文弹出栈。

对执行上下文的总结
- 单线程
- 同步执行，只有栈顶的上下文处于执行中，其他上下文需要等待
- 全局上下文只有唯一一个，在关闭浏览器的时候出栈
- 函数的执行上下文没有个数限制
- 每次某个函数被调用时，就会有个新的执行上下文为其创建，即使是调用自身

[参考：执行上下文](https://segmentfault.com/a/1190000012646203)