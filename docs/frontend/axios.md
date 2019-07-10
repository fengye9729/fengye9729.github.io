# get 方法参数传递数组
当使用 axios 库的时候，它自带一个 `qs` 库
```js
this.$axios.get('/getUserByName',{
    params:{
        names:['qwe','asd'] + '', // 将数组转成字符串
    }
}).then(res=>{
    console.log(res)
})
//所形成的url为： /getUserByName?names=qwe,asd   等价于 /getUserByName?names=qwe&names=asd
```

[参考资源](https://www.jianshu.com/p/68d81da4e1ad)
[参考](https://segmentfault.com/q/1010000010323643)