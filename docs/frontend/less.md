# less 在客户端使用存在跨域
按照官方教材，less 在客户端使用如下：
```js
// 首先，引入 rel 属性的值是 stylesheet/less 的 .less 样式表 :
<link rel="stylesheet/less" type="text/css" href="styles.less" />
// 接下来，下载 less.js 并将其包涵在您的页面 <head> 元素的 <script></script> 标记中，这里使用 CDN
<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.2.0/less.min.js"></script>
```

经过测试后，报跨域错误。

原因：chrome 禁止 js 访问本地文件。因此如果需要将 less 在客户端使用，通过启动服务器的方式。
