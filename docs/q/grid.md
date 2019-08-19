# grid 布局

网格布局（Grid)

Flex 布局针对轴线，一维布局
Grid 将容器划分为行和列，产生单元格，二维布局

- 采用网格布局的区域 --- 容器
- 容器内部采用网格定位的子元素 --- 项目

项目只能是容器的顶元素，不包含项目的子元素。

设置网格布局后，容器的项目的 `float`、`display: inline-block`、`display: table-cell`、`vertical-align` 和 `column-*` 设置失效[!!!]

> 容器属性

```css
- display: grid | display: inline-grid

- grid-template-columns | grid-template-rows
  - repeat()
  - auto-fill
  - fr
  - minmax()
  - auto
  - [网格线名称]

- grid-row-gap | grid-column-gap | grid-gap
- grid-template-areas
- grid-auto-flow: row | column
- justify-items | align-items | place-items
- justify-content | align-content | place-content
- grid-auto-rows | grid-auto-columns
- grid-template | grid
```

> 项目属性

```css
grid-column-start属性：左边框所在的垂直网格线
grid-column-end属性：右边框所在的垂直网格线
grid-row-start属性：上边框所在的水平网格线
grid-row-end属性：下边框所在的水平网格线
grid-column:  / ;
grid-row:  / ;
grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
justify-self: start | end | center | stretch;
align-self: start | end | center | stretch;
place-self: <align-self> <justify-self>;
```

[参考 --- CSS Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)