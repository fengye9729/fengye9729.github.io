---
title: localStorage 和 sessionStorage
date: 2018-05-23
tags: 
- HTML5
---
```js
localStorage
// Storage{length: 0}
sessionStorage
// Storage{length: 0}
```

```js
// 存储字符串
localStorage.setItem('username', 'fyflying')
localStorage.getItem('username') // 'fyflying'

// 存储数组
let array = [1,2,3]
localStorage.setItem('myArray', array)
localStorage.getItem('myArray') // "1,2,3"

// 存储对象
let obj = {
    a: 1,
    b: 2,
    c: 3
}
localStorage.setItem('myObj', obj)
localStorage.getItem('myObj') // "[object Object]"

localStorage.setItem('myObj', JSON.stringify(obj))
localStorage.getItem('myObj') // "{"a":1,"b":2,"c":3}"
JSON.parse(localStorage.getItem('myObj')) // {a: 1, b: 2, c: 3}
```

`setItem()` 作为 `Storage` 接口的方法，接受一个键名和值作为参数，将会把键名添加到存储中，如果键名已存在，则更新其对应的值。

```js
storage.setItem(keyName, keyValue);
// keyName 一个 DOMString
// keyValue 一个 DOMString
// 意思就是说 setItem 的 key value 都是字符串
// 所以在存储对象的时候需要转换
```

而 `sessionStorage` 和 `localStorage` 的本质区别就是生命周期不一样

 `localStorage` 里面存储的数据没有过期时间设置，而存储在 `sessionStorage` 里面的数据在页面会话结束时会被清除。
 
 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。