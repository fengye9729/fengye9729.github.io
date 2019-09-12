# vue 如何优化首页的加载速度？vue 首页白屏?

> 首页白屏的原因：

单页面应用的 html 是靠 js 生成，因为首屏需要加载很大的js文件(app.js vendor.js)，所以当网速差的时候会产生一定程度的白屏

解决办法：
- 优化 webpack 减少模块打包体积，code-split 按需加载
- 服务端渲染，在服务端事先拼装好首页所需的 html
- 首页加 loading 或 骨架屏 （仅仅是优化体验）
------------------
1. 使用首屏SSR + 跳转SPA方式来优化
2. 改单页应用为多页应用，需要修改webpack的entry
3. 改成多页以后使用应该使用prefetch的就使用
4. 处理加载的时间片，合理安排加载顺序，尽量不要有大面积空隙
5. CDN资源还是很重要的，最好分开，也能减少一些不必要的资源损耗
6. 使用Quicklink，在网速好的时候 可以帮助你预加载页面资源
7. 骨架屏这种的用户体验的东西一定要上，最好借助stream先将这部分输出给浏览器解析
8. 合理使用web worker优化一些计算
9. 缓存一定要使用，但是请注意合理使用
------------------
- 代码拆分。code split、动态import
- 多页面+单页面组合，不是整个网站都是同一个页面切换前端路由，酌情拆分一些其他页面作为新页面
- 直出ssr。使用ssr减少前端跑js的时间，逻辑放服务端处理把完整的页面返回
部分直出。使用ssr服务端压力会变大，所以可以把页面重要的部分先直出，非重要部分放前端
- 接入quicklink，实际上就是检查页面链接然后在浏览器空闲时间进行prefetch
接入service worker缓存，和ssr一起搭配使用更佳
- 体验上。增加lodaing、骨架屏
- 有了各种缓存，热启动是没什么问题了。最后要优化冷启动时间，使用prefetch
- 前端渲染上。使用raf渲染，不阻塞主线程。react里面已使用异步渲染
- 服务端rpc上。使用pb协议而不是文本协议
- 传输层使用quic协议传输。貌似没多少个团队用上～
- 常规操作。cdn、减少请求、雪碧图、gzip、浏览器缓存什么的就不多说了