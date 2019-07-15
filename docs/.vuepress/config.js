module.exports = {
  title: "ShiRouMi",
  description: "personal site",
  configureWebpack: {
    resolve: {
      alias: {
        "@src": "public/images"
      }
    }
  },
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "news", link: "/news/" },
      { text: "basic", link: "/basic/" }
    ],
    sidebar: {
      "/news/": ["2019-5-8", "2019-6-11"],
      "/basic/": ["window", "element"],
      "/": [
        {
          title: "前端",
          path: "/frontend/",
          children: ["/frontend/axios"]
        },
        {
          title: "Vue",
          path: "/vue/",
          children: ["/vue/createdata", "/vue/reactiveData", "/vue/computed"]
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
        }
      ]
    }
  }
};
