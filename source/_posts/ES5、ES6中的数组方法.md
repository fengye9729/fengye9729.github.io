---
title: ES5、ES6中的数组方法
date: 2018-05-13 
tags: 
- ES6 
- ES5
---

参考链接
- [ES5中新增的Array方法详细说明](http://www.zhangxinxu.com/wordpress/2013/04/es5%E6%96%B0%E5%A2%9E%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95/)

- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

有哪些方法

```js
/**
 * ES5
 * forEach()
 * map()
 * filter()
 * some()
 * every()
 * indexOf()
 * lastIndexOf()
 * reduce()
 * reduceRight()
 * 
 * ES6扩展
 * Array.from()
 * Array.of()
 * copyWithin()
 * find()
 * findIndex()
 * fill()
 * entries() values() keys()
 * includes()
 */
```

我们一个个来看

```js
ES5
// forEach 返回值：undefined
array.forEach((currentValue, index, array) => {})

// map 返回值：一个新数组 里面的每个元素都是回调函数的结果
array.map((currentValue, index, array) => {})

// filter 返回值： 一个新数组 通过测试的元素的数组
array.filter((element, index, array) => {})

// some 返回值： true/false 不会改变原数组 测试数组中的某些元素是否通过函数中的测试
array.some((value, index, array) => {})

// every 返回值：true/false 不会改变原数组 测试数组中的所有元素是否都通过了测试
array.every((value, index, array) => {})

// indexOf 返回值： 首个被找到的索引/-1
array.indexOf(searchElement[, fromIndex = 0]) 

// lastIndexOf 返回值： 找到的最后一个索引/-1 从后往前找
array.lastIndexOf(searchElement[, fromIndex = array.length - 1])
```

```js
ES6

// 将类数组对象/可迭代对象 => 数组
Array.from()
// 创建新数组
Array.of()
// 浅复制 改变原数组
array.copyWithin(target[, start[, end]])
// 返回第一个满足测试的值
array.find((element, index, array) => {})
// 返回第一个满足测试的索引/-1
array.fromIndex((element, index, array) => {})
// fill 填充 修改原数组
array.fill(value[, start[, end]])
// entries() 返回一个新的Array Iterator对象 keys： 键 values: 值
array.entries()
// includes 返回值: true/false 判断数组是否包含某个值
array.includes(searchElement, fromIndex)
```
