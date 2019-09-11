# webpack 打包 vue 速度太慢怎么办

[webpack 打包 vue 速度太慢怎么办](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/238)

使用 webpack-bundle-analyzer 对项目进行模块分析生成report，查看report后看看哪些模块体积过大，然后针对性优化。[详情参考](https://segmentfault.com/a/1190000012220132)

externals： 提供参数在输出的包中排除依赖项。防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖。

webpack 配置中设置 externals，将体积大的库分离出来
```js
externals: {
	'vue': 'Vue',
	'vuex': 'Vuex',
	'vue-router': 'VueRouter',
	'element-ui': 'ELEMENT'
}
// element-ui 变量名要使用 ELEMENT，因为element-ui的 umd 模块名是 ELEMENT
```

html 文件中引入 CDN，注意要在 `</body>` 前引入，否则会报错

注意，如果 element-ui 通过 CDN 引入，那么 vue 也必须通过 CDN 引入，而且在 element-ui 之前引入。