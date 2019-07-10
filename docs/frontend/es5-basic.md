# ES5

### 深浅拷贝

深浅拷贝针对的是引用类型的拷贝，基本类型直接就是赋值了。

拷贝的目的是复制原变量，但是修改不会影响原变量。

浅拷贝只复制一层对象的属性；深拷贝递归复制了所有层级

常用的浅拷贝方法 `Object.assign` `Array.concat` `...展开运算符`
常用的深拷贝方法 `JSON.parse(JSON.stringify())` 

实例案例：
- Redux 的 reducer 中，由于 reducer 是纯函数，因此 state 需要先深拷贝一份再操作。
- 

实现：


### 基本数据类型和引⽤类型在存储上的差别

[内存空间传送门](./memory-space.md)


### 类型判断
>（怎么判断对象类型？type array问题)(怎么判断对象类型？) 
> (==和===区别，什么情况用===)
>（undefined和null的区别，如何正确判断类别)
>（typeof 和Object.prototype.toString.call()方法）


### 执行上下文 作用域 作用域链 变量对象

[执行上下文---传送门](./execution-context.md)

[变量对象---传送门](./variable-object.md)

[作用域链---传送门](./scope-chain.md)

### 闭包
[闭包---传送门](./closures.md)

### 变量提升 函数提升（以及优先级问题）（函数参数值传递）
[传送门](https://github.com/ShiRouMi/blog/issues/23)

### 继承 (用 ES5 实现一个继承（有哪些方式）(class 继承）（继承原理) (写一个A类作为基类，让B继承A)
JavaScript 的继承机制是定义在原型上的属性和方法，能够被所有实例所共享，这样节省了内存，体现了实例对象之间的联系

### this 的指向问题（不同场景下 this 的值是什么
[this---传送门](./this.md)

### new instanceof
> new 操作符干了什么？instanceof (创建一个函数的过程是什么; new一个函数的过程是什么)

![new](../.vuepress/public/images/new.jpg)

[new instanceof --- 传送门](https://github.com/ShiRouMi/blog/issues/3)

### call、apply、bind 区别，bind 怎么实现的？(其他改变this指向的方法)
[传送门](https://github.com/ShiRouMi/blog/issues/5)

### V8垃圾回收机制
__self__: JS 语言中，不再被引用的对象会被垃圾回收机制回收。