# 移动端开发

> meta viewport

```js
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```
```js
width=device-width: 让当前viewport宽度等于设备的宽度
user-scalable=no: 禁止用户缩放
initial-scale=1.0: 设置页面的初始缩放值为不缩放
maximum-scale=1.0: 允许用户的最大缩放值为1.0
minimum-scale=1.0: 允许用户的最小缩放值为1.0
```

> 媒体查询

```css
@media （）and（）{}
//满足（）里的条件，就执行大括号里css的样式

<link rel="stylesheet" href="style.css" media="(max-width:320px)">
```

> click 300ms 延迟

当前主流的设备是不会有这个问题的，作为移动端经典坑存在。

移动设备上的 web 网页有 300ms 延迟，往往会导致点击按钮延迟或者点击失效。这是由于区别单击事件和双击屏幕缩放的历史原因导致的。早些年前 chrome 已经把这个延迟去掉了，如果还发生这个问题，解决方式是：
- fastclick可以解决在手机上点击事件的300ms延迟
- zepto的touch模块，tap事件也是为了解决在click的延迟问题
- 触摸事件的响应顺序为 touchstart --> touchmove --> touchend --> click,也可以通过绑定ontouchstart事件，加快对事件的响应，解决300ms延迟问题
- 若移动设备兼容性正常的话, 只需加上一个 meta 标签
  ```js
  <meta name="viewport" content="width=device-width">
  // 把viewport设置成设备的实际像素，那么就不会有这300ms的延迟
  ```

> 手机端样式兼容处理

- 设置 meta 的 viewport 属性，使其无视设备的真实分辨率，直接通过dpi，在物理尺寸和浏览器之间重设分辨率，从而达到能有统一的分辨率的效果，并且禁止掉用户缩放
  ```js
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  ```
- 使用 rem 进行屏幕适配，设置好 root 元素的 font-size 大小，然后在开发的时候，所有与像素有关的布局统一换成 rem 单位。针对不同的手机，使用媒体查询对 root 元素 font-size 进行调整

> 阻止旋转屏幕时自动跳转字体大小

移动端开发时，屏幕有竖屏和横屏模式，当屏幕进行旋转时，字体大小则有可能会发生变化，从而影响页面布局的整体样式

  ```css
  * {
    -webkit-text-size-adjust: none;
  }
  ```

> 修改移动端难看的点击的高亮效果，iOS和安卓下都有效

```css
* {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

pointer-events: none; // 使得元素看得见点不着
```

> others

```css
// iOS下取消input在输入的时候英文首字母的默认大写
<input type="text" autocapitalize="none">

// 禁止 iOS 识别长串数字为电话
<meta name="format-detection" content="telephone=no" />

// 禁止 iOS 弹出各种操作窗口
-webkit-touch-callout: none;

// 禁止ios和android用户选中文字
-webkit-user-select: none;

// calc的兼容处理
div { 
  width: 95%; 
  width: -webkit-calc(100% - 50px); 
  width: calc(100% - 50px); 
}

// 消除transition闪屏问题
/*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/
-webkit-transform-style: preserve-3d;
/*(设置进行转换的元素的背面在面对用户时是否可见：隐藏)*/ 
-webkit-backface-visibility: hidden; 

// iOS系统中文输入法输入英文时，字母之间可能会出现一个六分之一的空格
this.value = this.value.replace(/\u2006/g, ''); // 通过正则去除

// input 的 placeholder 会出现文本位置偏上的情况, input 的placeholder会出现文本位置偏上的情况：PC端设置line-height等于height能够对齐，而移动端仍然是偏上
line-height：normal;

// overflow-x: auto在iOS有兼容问题
-webkit-overflow-scrolling: touch;
```

> fixed 定位缺陷

iOS 下 fixed 元素容易定位出错，软键盘弹出时，影响 fixed 元素定位，android 下 fixed 表现要比 iOS 更好，软键盘弹出时，不会影响 fixed 元素定位 。iOS4 下不支持 position:fixed

解决方案：可用 iScroll 插件解决这个问题

> 一些情况下对非可点击元素如(label,span)监听click事件，ios下不会触发

对不触发 click 事件的那些元素添加一行css代码即可: `cursor: pointer;`

> CSS动画页面闪白,动画卡顿

- 尽可能地使用合成属性 transform 和opacity 来设计 CSS3 动画，不使用position 的 left 和 top 来定位
- 开启硬件加速
```css
-webkit-transform: translate3d(0, 0, 0);
-moz-transform: translate3d(0, 0, 0);
-ms-transform: translate3d(0, 0, 0);
transform: translate3d(0, 0, 0);
```