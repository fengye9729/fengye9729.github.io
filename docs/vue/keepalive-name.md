# vue-router 与 keep-alive
keep-alive 可以接收 include 属性，使得只有名称匹配的组件会被缓存。
include 首先检查组件自身的 name 属性，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。

vue-router 命名视图，name 属性。如果 `<router-view>` 设置了名称，则会渲染对应的路由配置中 components 下的相应组件。

**注意区别以上两者的 name，一个是组件的name，一个是 `<router-view>` 的 name，不要混淆使用。**

因为之前没能弄清楚，使得我在使用 `keep-alive` 缓存路由组件的时候，始终不能缓存设定的组件。原因就是目标组件是匿名组件，无法被 keep-alive 的 include 匹配到