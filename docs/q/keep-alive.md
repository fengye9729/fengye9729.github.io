# keep-alive
`<keep-alive>` 是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

当组件在 `<keep-alive>` 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

注意点：
- 主要用于保留组件状态或避免重新渲染。
- `<keep-alive>` 是用在其一个直属的子组件被开关的情形。如果你在其中有 `v-for` 则不会工作。如果有上述的多个条件性的子元素，`<keep-alive>` 要求同时只有一个子元素被渲染。
- `<keep-alive>` 不会在**函数式组件**中正常工作，因为它们没有缓存实例。

> keep-alive的声明周期执行

- 页面第一次进入，钩子的触发顺序
  created-> mounted-> activated，
- 退出时触发 deactivated
- 当再次进入（前进或者后退）时，只触发 activated
- 事件挂载的方法等，只执行一次的放在 mounted 中；组件每次进去执行的方法放在 activated 中

非首次进入 keep-alive 组件时，正常的 vue 组件生命周期函数是不会再执行，而会执行 keep-alive 新增的两个周期钩子函数。同时也可以看出离开 keep-alive 组件时其 destroy 周期函数并没有执行，从侧面证明缓存组件并没有销毁。

`<keep-alive>` 只处理第一个子元素，所以一般和它搭配使用的有 component 动态组件或者是 router-view，这点要牢记。

对于首次渲染而言，除了在 `<keep-alive>` 中建立缓存，和普通组件渲染没什么区别;
被 `<keep-alive>` 包裹的组件在有缓存的时候就不会在执行组件的 `created、mounted` 等钩子函数

> 动态移除缓存组件

如何动态移除缓存？
keep-alive 默认不支持动态销毁已缓存的组件，解决方案是通过直接操控 keep-alvie 组件里的 cache 列表，暴力移除缓存
```js
//使用Vue.mixin的方法拦截了路由离开事件，并在该拦截方法中实现了销毁页面缓存的功能。
Vue.mixin({
  beforeRouteLeave: function(to, from, next){
    if (from && from.meta.rank && to.meta.rank && from.meta.rank>to.meta.rank) {//此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
          if (this.$vnode.componentOptions) {
            var key = this.$vnode.key == null
                        ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
                        : this.$vnode.key;
            var cache = this.$vnode.parent.componentInstance.cache;
            var keys  = this.$vnode.parent.componentInstance.keys;
            if (cache[key]) {
              if (keys.length) {
                var index = keys.indexOf(key);
                if (index > -1) {
                    keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$destroy();
    }
    next();
  }
});
```
- max(2.5.0 新增)
最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。
```js
<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
```

> vue-router 与 keep-alive

```js
// now
<keep-alive :include="include">
    // 需要缓存的视图组件
  <router-view></router-view>
</keep-alive>

// old
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

> 考虑：组件销毁的时候缓存是否还会在

组件销毁的时候缓存还在，所以要手动移除缓存