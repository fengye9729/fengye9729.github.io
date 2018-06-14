---
title: ES5、ES6对象方法
date: 2018-05-15 
tags: 
- ES6 
- ES5
---

### Object 构造函数

```js
ES6
Object.assign()     
Object.getOwnPropertyDescriptor()    
Object.is() 
Object.entries()
Object.keys()
Object.values()
Object.setPrototypeOf()
Object.getPrototypeOf() 
Object.getOwnPropertySymbols()
ES5
Object.create()
Object.defineProperty()
Object.defineProperties()
Object.getOwnPropertyNames()
```

### Object 实例和 Object 原型对象

```js
属性
Object.prototype.constructor
方法
Object.prototype.hasOwnProperty()
Object.prototype.isPrototypeOf()
Object.prototype.propertyIsEnumerable()
Object.prototype.toLocaleString()
Object.prototype.toString()
Object.prototype.valueOf()
```

好，我们挑几个来看

**Object.assign() 浅拷贝**

```js
// target: 目标对象 source: 源对象 返回值: 目标对象
// 只会拷贝源对象自身的并且可枚举的属性到目标对象
// Object.assign 不会跳过那些值为 null 或 undefined 的源对象。
Object.assign(target, ...sources)
// demo
var obj = {'a': 1, b: null, c: undefined};
var result = Object.assign({'hello': {'world': 1}}, obj)
console.log(result) // {hello: {world: 1}, a: 1, b: null, c: undefined}
```

**Object.is()**

```js
// 判断两个值是否相等 返回值: true/false
// 不同于 == , 也不同于 ===
// == 运算符会对它两边的操作数做隐式类型转换（如果它们类型不同），然后才进行相等性比较
// ===运算符（和==运算符）将数字值-0和+0视为相等，并认为Number.NaN不等于NaN。
// Object.is()就是解决 == 和 === 的缺点的
Object.is(value1, value2)
Object.is(null, null) // true
Object.is(undefined, undefined) // true
Object.is(+0, -0) // false
Object.is (NaN, NaN) // true
Object.is({}, {}) // false
+0 === -0 // true
NaN === NaN // false
```

**Object.getOwnPropertyDescriptor()**

```js
// obj：需要查找的目标对象 prop：目标对象内属性名称(String) 返回值: 属性描述符对象 / undefined
Object.getOwnPropertyDescriptor(obj, prop)

var o = {};
Object.defineProperty(o, "baz", {
  value: 8675309,
  writable: false,
  enumerable: false
}); // {baz: 8675309}
var d = Object.getOwnPropertyDescriptor(o, "baz");
// d {
//   value: 8675309,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

**Object.entries()**

```js
// 返回：一个给定对象自身可枚举属性的键值对数组 数组
// 与 for-in ：循环也枚举原型链中的属性
Object.entries(obj)

var obj = { hello: 'a', world: 'b' }
console.log(Object.entries(obj)) // [['hello', 'a'],['world', 'b']]

const anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.entries(anObj)); // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]

// 将 Object 转为 Map
var obj = { hello: 'a', world: 'b' }
var map = new Map(Object.entries(obj))
console.log(map) // {"hello" => "a", "world" => "b"}
```

**Object.defineProperty()**

```js
// 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象
// obj: 定义属性的对象 
// prop: 定义或修改属性的名称 
// descriptor: 将被定义或修改的属性描述符 
// 返回值: 被传递给函数的对象
Object.defineProperty(obj, prop, descriptor)

var obj = {}
Object.defineProperty(obj, "key", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: "static"
});
```