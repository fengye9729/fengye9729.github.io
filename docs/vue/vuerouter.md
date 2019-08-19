# Vue 路由实现原理
## 前端路由的实现原理
以前，当页面url 地址变更的时候，页面会刷新，这样的用户体验很差。

ajax 以前，浏览器发起请求的方式：

- 地址栏发起请求（页面会刷新
- a 标签，链接到一个地址（页面会刷新
- 通过img script link 标签（对特定文件的请求，页面无刷新

ajax 可以在不刷新页面的情况下向服务器请求数据，
尤其是当出现单页应用（SPA)后，页面交互无刷新，页面跳转也是无刷新的，增强了用户体验。

### 用模板引擎开发页面时
- 浏览器发出请求
- 服务端接收请求，解析 url
- 根据服务端的配置，返回相应信息
- 浏览器根据数据包的 content-type 来决定如何解析data

路由是与服务器进行交互的一种方式，通过不同路径，来请求不同的资源，（请求不同的页面也是其中一种

## Vue-Router 两种模式
- hash（默）
- history （需要后台配置）

匹配不同的路径，进行解析，动态渲染出页面。但是每次 url 变化，会导致页面刷新。如何使其在改变url 时候页面不刷新呢？

### hash 模式
`http://www.xxx.com/#/login`
url 的 hash 是以 # 开头，原本是用来作为锚点，从而定位到页面的特定区域。fragment 后面hash 值的变化，不会导致浏览器发送请求，自然不会刷新页面。每次hash 值变化，监听 hashChange 回调，回调里可以实现页面更新的操作，从而达到跳转页面的效果。

**fragment 特性**
- 修改 # 后的 fragment 不会导致页面重载，但是会改变浏览器的历史记录
- 作为 url 发起 http 请求时， fragment 的部分不会包含在请求头中，自然不会发送给服务器
- fragment 一般不会被搜索引擎收入

### history 模式
H5的出现，两个 API `pushState` `replaceState` 来进行路由控制。通过这两个方法，可以实现改变 url 且不向服务器发送请求。
配置 `mode: histroy` url 是正常的url ，当访问不存在的页面时，页面为空白。
使用 H5 单页路由就没有这个 # ，变得更加美观；不过当部署到服务器时候，刷新页面会导致404
- 为什么跑在服务器上才有这个问题
- 为什么hash 模式没有这个问题 而 history 模式有这个问题

当使用 history模式时，url 是正常的url ，可是 vue-router 的路径不是正确打包后的路径（打包后的路径带上了hash值），刷新页面，以为是正常地址请求，而地址不对所以会返回404，因此需要后台配置，如果匹配不到任何静态资源，就重定向到一个指定的页面（比如 index.html)

## 利用 History API 无刷新更改地址栏
假设一个页面左侧是若干导航链接，右侧是内容，同时导航时只有右侧的内容需要更新，那么刷新整个页面无疑是浪费的。这时我们可以使用 AJAX 来拉取右面的数据。但是如果仅仅这样，地址栏是不会改变的，用户无法前进、后退，也无法收藏当前页面或者把当前页面分享给他人；搜索引擎抓取也有困难。这时，就可以使用 HTML5 的 History API 来解决这个问题。

思路：首先绑定click事件。当用户点击一个链接时，通过preventDefault函数防止默认的行为（页面跳转），同时读取链接的地址（如果有 jQuery，可以写成$(this).attr('href')），把这个地址通过pushState塞入浏览器历史记录中，再利用 AJAX 技术拉取（如果有 jQuery，可以使用$.get方法）这个地址中真正的内容，同时替换当前网页的内容。

为了处理用户前进、后退，我们监听popstate事件。当用户点击前进或后退按钮时，浏览器地址自动被转换成相应的地址，同时popstate事件发生。在事件处理函数中，我们根据当前的地址抓取相应的内容，然后利用 AJAX 拉取这个地址的真正内容，呈现，即可。

最后，整个过程是不会改变页面标题的，可以通过直接对document.title赋值来更改页面标题。

```js
<html>
  <head>
    <meta charset="utf-8" />
    <style>
    .left {
      width:400px;
      border-right: 1px solid #ccc;
      float: left;
    }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left">
        <ul>
          <li>
            <a href="11">link one</a>
          </li>
          <li>
            <a href="22">link two</a>
          </li>
          <li>
            <a href="33">link three</a>
          </li>
        </ul>
      </div>
      <div class="right">content</div>
    </div>
  </body>
  <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
  </script>
  <script>
    function getDate(callback) {
      var url = 'https://easy-mock.com/mock/5c9982d415226c39ba344115/history/content'
      $.ajax({
        url: url,
        success: function (result) {
          return callback(result)
        }
      })
    }

    var UL = document.querySelector('ul')

    UL.addEventListener('click', function (event) {
      var ev = event.target
      event.preventDefault() // 阻止默认行为（跳转）
      
      var address = ev.getAttribute('href')
      var state = {
        name: address
      }
      window.history.pushState(state, 'aaaa', address)

      getDate(function(data) {
        $('.right').html(data[address])
        document.title = data[state.name]
      })
    })

    window.addEventListener('popstate', function(e) {
      var state = e.state
      getDate(function (data) {
        $('.right').html(data[state.name])
        document.title = data[state.name]
      })
    })
  </script>
</html>
```

另外，因为这里 url 跳转不支持跨域，所以需要将页面跑在服务器上
注意，如果地址栏直接刷新，相当于请求地址栏的页面，可实际上并不存在，所以会返回 404

[参考--- 利用 History API 无刷新更改地址栏](https://www.renfei.org/blog/html5-introduction-3-history-api.html)