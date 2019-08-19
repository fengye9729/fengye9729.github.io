# CSS 知识点集合

概念：
- em 与 rem
- vw 与 vh
- position:sticky
- 伪类与伪元素
  - 伪类： ::active ::focus ::hover ::link ::visited ::first-child
  - 伪元素 ::first-letter ::first-line ::before ::after
- 如何清除浮动
  - 父级设置高度
  - 创建父级 BFC
  - 增加伪元素
- 盒模型
- 选择器优先级
- link 与 @import 的区别
- 关系选择符
  - E F
  - E>F
  - E+F
  - E~F
- `{display: inline-block}` 会遇到的问题
  
  当子元素设置为 `inline-block` 元素时，如果父元素的 font-size不是0, 这个换行符是会占一定空间的，导致这个父元素里的子元素总宽度是50% + 换行符宽度 + 50%，也就导致第二个div被挤到下面去
- visibility:hidden 和 display: none

实现：
- 用 CSS 实现三角形
- 移动端适配 1px 的问题(Retina下 1px)
- 两个元素块，一左一右，中间相距10px
- 左侧固定，右侧自适应
- 上下固定，中间滚动布局
- 左右两边定宽，中间自适应
- 实现一个自适应正方形
- 分别用 CSS 和 JS 实现一个自适应动画
- transform 和直接使用 left top 改变位置的差别
- CSS 动画实现暂停
- 如何使得图标和文字垂直对齐居中
- 三栏布局的圣杯和双飞翼 [参考](https://zhuanlan.zhihu.com/p/25070186)
- 瀑布流效果
- 使用 CSS 绘制几何图形（圆形 三角形 扇形 菱形 etc)
- 使用 CSS 实现曲线运动（贝塞尔曲线）
