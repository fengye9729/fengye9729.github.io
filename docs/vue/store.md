# Vue 引入 Vuex 的 store 必须是小写？
刚刚遇到一个问题，我在引入 Vuex 的时候，写法如下
```js
// XXXXXX
import Store from './store'

// XXXXXX

new Vue({
  el: "#app",
  router,
  Store,
  render: h => h(App)
});
```
报错如下：`Error in render: "TypeError: Cannot read property 'state' of undefined"`

当我修改为 `store` 后，错误解决。
```js
import store from './store'

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
```

当下一头雾水了，怎么回事? 我用的是 `export default`命令指定默认输出，其他模块加载该模块时，`import` 命令可以为该匿名函数指定任意名字。

冷静了两秒钟，知道了问题根源。
```js
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
```

ES6 的便捷语法永久了以后，容易犯幼稚的错误。
上面这段代码使用了 ES6 **对象属性简写**方式，事实上代码等同如下：
```js
new Vue({
  el: "#app",
  router: router,
  store: store,
  render: h => h(App)
});
```

因此我如果直接写 `Store`，等同于 `Store: Store`，而 `Store` 并非 `new Vue` 的属性，因此报错。

