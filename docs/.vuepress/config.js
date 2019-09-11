module.exports = {
  title: "ShiRouMi",
  description: "personal site",
  head: [
    ['link', { rel: 'icon', href: '/fefeng.ico' }]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        "@src": "public/images"
      }
    }
  },
  themeConfig: {
    nav: [
      { text: "Home", link: "/frontend/" },
      { text: "new", link: "/news/" },
      { text: "basic", link: "/basic/" },
      { text: "q", link: "/q/" }
    ],
    sidebar: {
      "/q/": [
        {
          title: '基础',
          children: [
            "深浅拷贝",
            "call apply bind",
            "promise",
            "async-await",
            "axios",
            "eventloop",
            "箭头函数",
            "class",
            "原型",
            "监听DOM变动",
            "event",
            "HTML5",
            "防抖与节流"
          ]
        },
        {
          title: "CSS",
          children: [
            "css",
            "flex",
            "grid",
            "水平垂直居中",
            "CSS3",
            "BFC",
            "cssmixins",
            "mobile",
            "mobileDev"
          ]
        },
        {
          title: 'Vue',
          children: [
            "vue",
            "MVVM",
            "观察者模式",
            "双向绑定原理",
            "数据驱动",
            "响应式原理",
            "Vue3.0",
            "vue-proxy",
            "EventEmitter",
            "VueRouter实现原理",
            "虚拟DOM",
            "生命周期",
            "keep-alive",
            "$nextTick",
            "vue_key",
            "vue-array",
            "vue-optimization",
            "vue-bigdata",
            "vue-agent",
            "vue-father-son-order",
            "vuex"
          ]
        },
        {
          title: 'Network',
          children: [
            "跨域",
            "http",
            "缓存",
            "性能优化",
            "UDP&TCP",
            "安全"
          ]
        }
      ],
      "/news/": ["2019-8-28", "es2019","2019-6-11", "2019-5-8",],
      "/basic/": ["window", "element", "event", "HTML5", "object"],
      "/": [
        {
          title: "前端",
          path: "/frontend/",
          children: [
            "/frontend/project",
            "/frontend/handle-error",
            "/frontend/fe-frame",
            "/frontend/js-exception-handling",
            "/frontend/axios", 
            "/frontend/less",
            "/frontend/fragment",
            "/frontend/code-multy"
          ]
        },
        {
          title: "Vue",
          path: "/vue/",
          children: [
            "/vue/vuex-persist",
            "/vue/vue-new-api",
            "/vue/keepalive_forward_back",
            "/vue/keepalive-name",
            "/vue/testObj",
            "/vue/store",
            "/vue/createdata", 
            "/vue/reactiveData", 
            "/vue/computed"
          ]
        },
        {
          title: "React",
          path: "/react/",
          children: ["/react/event"]
        },
        {
          title: "后端",
          path: "/backend/",
          children: ["/backend/charles", "/backend/agent"]
        },
        {
          title: "webpack",
          path: "/webpack/",
          children: ["/webpack/优化Vue打包速度"]
        }
      ]
    }
  }
};
