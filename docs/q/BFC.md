# BFC

> - BFC 是什么？
> - BFC 用来解决什么问题？

下列情况将创建一个块格式化上下文(BFC)：
- ① float
- ② overflow
- ③ display（display为inline-block、table-cell）
- ④ position（absolute 或 fixed）

BFC 的作用：
- 清除内部浮动：对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为0 解决这个问题，只需要把把父元素变成一个 BFC 就行了。常用的办法是给父元素设置`overflow:hidden`。
- 上下margin重合问题，可以通过触发BFC来解决