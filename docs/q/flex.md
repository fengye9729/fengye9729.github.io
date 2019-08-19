# flex 布局

传统的布局解决方案，基于「盒状模型」，依赖 display + position + float，对于特殊的布局，比如水平垂直居中，实现并不容易。

flex 布局，意味"弹性布局", 为盒状模型提供灵活性。任何元素都可以使用 flex 布局，包括行内元素。Webkit 内核的浏览器，必须加上 `-webkit` 前缀。
设为 flex 布局以后，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效。[!!!]

- 采用 flex 布局的元素 --- 容器
- 它的子元素成为容器成员 --- 项目

> 容器属性

```css
flex-direction: row | row-reverse | column | column-reverse
flex-wrap: nowrap | wrap | wrap-reverse
flex-flow: <flex-direction> || <flex-wrap>;
justify-content: flex-start | flex-end | center | space-between | space-around;
align-items: flex-start | flex-end | center | baseline | stretch;
align-content: flex-start | flex-end | center | space-between | space-around | stretch;
```

> 项目属性

```css
order: <integer>;
flex-grow:  <number>; /* default 0 */
flex-shrink: <number>; /* default 1 */
flex-basis:  <length> | auto; /* default auto */
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```

[参考](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)