# 前端处理异常

### 大纲

- 为什么要处理异常？
- 异常情况有哪些？
- 异常场景
- 前端异常监控
  - 异常捕获
  - 上报机制
- Vue 中异常处理 API

## 为什么要处理异常？

异常是不可控的，会影响最终的呈现结果
1. 增强用户体验；
2. 远程定位问题；
3. 未雨绸缪，及早发现问题；
4. 无法复现问题，尤其是移动端，机型，系统都是问题；
5. 完善的前端方案，前端监控系统

## 异常情况有哪些？
- `JS` 语法错误、代码异常
- `AJAX` 请求异常
- 静态资源加载异常
- `Promise` 异常
- `Iframe` 异常
- 跨域 Script error
- 崩溃和卡顿


## 异常捕获方法

注意：是否能捕获到异常，与是否会报错，是两个概念，不要混淆了。

1. try...catch
2. window.onerror
3. window.addEventListener
4. Promise Catch
5. VUE errorHandler

如何优雅处理前端异常？采用以下组合方案，分类型的去捕获异常
1. 可疑区域增加 Try-Catch
2. 全局监控 JS 异常 window.onerror
3. 全局监控静态资源异常 window.addEventListener
4. 捕获没有 Catch 的 Promise 异常：unhandledrejection
5. VUE errorHandler 和 React componentDidCatch
6. 监控网页崩溃：window 对象的 load 和 beforeunload
7. 跨域 crossOrigin 解决

[如何优雅处理前端异常？](http://jartto.wang/2018/11/20/js-exception-handling/index.html)

## 前端异常监控
前端异常监控中需要了解「异常捕获」与「上报机制」。
正所谓百密一疏，一个经过了大量测试及联调的项目在有些时候还是会有十分隐蔽的bug存在，这种复杂而又不可预见性的问题唯有通过完善的监控机制才能有效的减少其带来的损失，因此对于直面用户的前端而言，异常捕获与上报是至关重要的。
前端异常捕获与上报是前端异常监控的前提，了解并做好了异常数据的收集和分析才能实现一个完善的错误响应和处理机制，最终达成数据可视化。

[谈谈前端异常捕获与上报](https://www.cnblogs.com/luozhihao/p/8635507.html)

### Vue 中异常处理 API
- errorHandler
- warnHandler
- renderError
- errorCaptured