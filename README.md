[blog](https://github.com/ShiRouMi/ShiRouMi.github.io/issues)

这个博客的目的就是记录笔记。
from 2019-5-16

2019-9-12:
按照阮老师的 [GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html), 第一次试验失败。由于我的主分支是 hexo ，发布后部署到 master， 所以配置文件需要做点调整。

2019-7-15：
有点意思，一直以来都是使用这条命令：
`"deploy": "yarn docs:build && gh-pages -d docs/.vuepress/dist -b master -t",`
导致项目地址不能导到域名上，
明明配置了持续集成啊 `deploy.sh`，
今天才意识到应该是运行 `bash deploy.sh`，愚蠢啊愚蠢。