# Charles 抓包 localhost

`Charles` 无法拦截本地服务器
`localhost` 和 `127.0.0.1` 都无法抓取

解决方式：将访问地址 `localhost` 改成 `localhost.charlesproxy.com`

![Image from alias](../.vuepress/public/images/charles.png)
[参考：Localhost traffic doesn't appear in Charles](https://www.charlesproxy.com/documentation/faqs/localhost-traffic-doesnt-appear-in-charles/)