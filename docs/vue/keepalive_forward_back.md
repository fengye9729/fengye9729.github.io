# 基于 Vue 的前进刷新后退不刷新解决方案
移动 WebApp 切换页面中，有以下需求：
- 主页进入列表页---列表页刷新，列表页进入详情页---详情页刷新
- 详情页回到列表页---列表页不刷新，列表页回到主页---主页不刷新

要实现**前进刷新，后退不刷新**操作，首先需要识别前进后退行为，其次后退时恢复之前的页面。

### 识别前进后退行为
受浏览器的限制，在识别用户操作是前进或是后退有以下约束：
1. 没有提供前进后退事件
2. 不允许开发者读取浏览记录
3. 用户可以手动输入地址改变url | 浏览器提供的前进后退按钮改变 url

在访问一个新页面的时候，将页面缓存起来，因为浏览器不允许开发者读取浏览记录，并且刷新页面的时候浏览记录需要还在，于是将页面缓存到 `sessionStorage`里。相当于维护**一份浏览记录**。url 改变的时候，url 与浏览记录相比较：
- 当 url 存在于浏览记录中时，说明页面已被访问过，即当下行为为后退
- 当 url 不存在与浏览记录中时，说明在访问新的页面，即当下行为为前进
- 当 url 在浏览记录的末端，即当下行为为刷新

因为同一个页面可能会被多次访问，为了识别同一个页面的不同实例，需要给路由添加 key 值，有以下两种情况需要注意：
A->B->C 三个页面
- A->B->A A 前进到 B 后，回退到 A, 那么前后两个 A key 值相同
- A->B->C-A A 前进到 B, B 前进到 C, C 再前进到A, 这两个A key值是不相同的

### 后退时恢复之前的页面
首先我们弄清楚 Vue 中 `keep-alive` 缓存组件的生命周期情况:
- 首次进入页面，生命周期钩子触发顺序为 `beforeCreate--->created--->beforeMount--->mounted--->activated`
- 退出时会触发 `deactivated`
- 再次进入页面，只会触发`activated`

如果没有设置缓存，页面切换的时候，会触发`destroyed` 生命周期钩子销毁实例；页面设置了缓存，除了首次进入页面，其他时候进入离开页面只会触发`activated 和 deactivated` 生命周期钩子。

-----------

通读 keep-alive 的缓存机制，可以参考[Vue.js 技术揭秘---keep-alive](https://ustbhuangyi.github.io/vue-analysis/extend/keep-alive.html)

render 的时候先取到默认插槽 VNode, 计算出 VNode 的key；根据 Key 值判断是否已缓存
- 已缓存：将缓存的实例赋给 `componentInstance`，这样vue就会根据这个实例来恢复组件
- 未缓存：将vnode存储到内存中，下次返回到该页面时可以从内存中恢复

注意：后退的时候要将离开的路由实例给销毁掉

[参考](https://segmentfault.com/a/1190000010428654)
[vue-navigation](https://github.com/zack24q/vue-navigation)

### 2019-8-25 补充
同事给了一个新的方案，使用嵌套视图，大致的代码如下：
```js
// 路由配置
routes = [
  {
    name: "list",
    path: '/list',
    component: () => import("./test/list.vue"),
    children: [
      {
        name: "detail",
        path: "detail/:id",
        component: () => import("./test/detail.vue")
      }
    ]
  }
]
// list.vue
<div>
  <h2>这是list 页面</h2>
  <ul>
    <li @click="itemClick(item)" v-for="item in 4">{{item}}</li>
  </ul>
  <router-view></router-view>
</div> 

// detail.vue
<div>
  这是 detail 页面
  <h2>{{$route.params.id}}</h2>
</div>
```
这的确是一种列表页到详情页的展示方式，不过根本上不是「前进刷新，后退不刷新」的解决方案。首先，根据 id 的不同显示不同的详情页，id 改变，除了首次加载详情页视图的时候会刷新，切换id，无论前进还是后退，展示不同详情页只会触发 `beforeRouteUpdate` 钩子，详情页组件没有销毁与重建。而且，将详情页与列表页放在一个页面下并不是普遍的处理方式。

**对于一个带有动态参数的路径 `/foo/:id`，在 `/foo/1` 和 `/foo/2` 之间跳转的时候，由于会渲染同样的 Foo 组件，因此组件实例会被复用**，这时候只会触发 `beforeRouteUpdate` 钩子