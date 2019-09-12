# 对 Vuex 的理解
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

不要为了用 Vuex 而用 vuex

一般的后台项目来说，虽然庞大，几十个业务模块，几十张权限，但是业务之间的耦合度低

所以并不一定需要使用 vuex 来存储 data，每个页面里存放自己的 data 就行

不过还是有些数据需要用 vuex 来统一管理，比如登录 token，用户信息，或者是一些全局个人偏好设置，用 vuex 管理更加方便。需要结合业务场景具体考虑