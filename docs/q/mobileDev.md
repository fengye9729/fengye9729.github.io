# 移动端开发特性

> 设计稿大小

- IOS: 750*1334px
- 安卓: 1080*1920px

> 一些移动端概念

- 英寸：屏幕的物理大小 1英寸=2.54厘米
- PPI：每英寸包含的像素数，可以用来描述屏幕的清晰度和一张图片的指令
- DPI: 每英寸包括的点数
- 物理像素: 屏幕上最小的物理显示单元
- 设备独立像素 (DIP | DP)
- 设备像素比 dpr: 物理像素和设备独立像素之比
- ios 的尺寸单位是 pt; android 尺寸单位是 dp
- p 代表屏幕纵向的像素个数，1080p 即纵向有 1080 个像素，分辨率 1920 * 1080 的屏幕就属于 1080p 屏幕
- k 代表屏幕横向有几个 1024 像素，横向超过 2048 就属于 2k 屏，横向像素超过 4096 就属于 4k 屏
- 布局视口 视觉视口 理想视口
  - 布局视口（不包括 border margin 滚动）`document.documentElement.clientWidth/clientHeight`
  - 视觉视口 用户通过屏幕真实看到的区域，默认为浏览器窗口大小，包括滚动条宽度 `window.innerWidth/innerHeight`
  - 理想视口 当页面缩放比例为 100% 时， CSS 像素=设备独立像素，理想视口=视觉视口 `screen.width/height`

> Native WebApp Hybrid ReactNative Weex?

- OS operating system 操作系统
- IOS iphone operating system 苹果系统
- AOS android operating system 安卓操作系统

NativeApp: 传统原生 APP 开发模式，使用 Swift OC Java

WebApp: 移动端的网站，常被称为 H5 应用，运行在移动浏览器上的网页，一般泛指 SPA，使用 React Vue Angular

HybridApp: 混合模式移动应用，介于 WebApp 和 NativeApp 之间，使用 PhoneGap AppCan。。。

ReactNative App: 栗子--- facebook youtube qq

WeexApp: 栗子---淘宝 天猫 阿里云 饿了么