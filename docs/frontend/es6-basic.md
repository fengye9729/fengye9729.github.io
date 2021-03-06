# ES6 

### let const var 

> let 会提升吗？声明、初始化、赋值等概念。什么是暂时性死区？

- let 声明的变量只在 let 命令所在的代码块中有效。for 循环的计数器，很适合使用 let
- let 声明的变量不存在**变量提升**, 如果在声明前使用变量，会报错。
- 存在**暂时性死区（TDZ)** ：在代码块内，使用 let 声明变量之前
- const 声明一个只读的常量（内存地址不变)(**本质**），一旦声明，必须立即初始化。当const 声明一个对象时，对象的属性是可以修改的
- var声明的变量,存在变量提升,在函数内部声明的变量，都会被提升到该函数开头，而在全局声明的变量，就会提升到全局作用域的顶部。
- 函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部

ES5 声明变量两种方式：`var` `function`

ES6 声明变量多出四种方式： `let` `const` `class` `import`

### 扩展运算符 rest 参数 解构赋值

> 区分三者： 扩展运算符， rest 参数， 解构赋值

扩展运算符是三个点（...), 将一个数组转换成用逗号分隔的参数序列。
该运算符主要用于函数的调用。注意：**只有函数调用时，扩展运算符才可以放到括号内。

扩展运算符用处：
- 代替 `apply` 方法
- 复制数组 合并数组
- 与解构赋值结合

rest 参数（形式为 `...变量名`），用于获取函数多余的参数，这样就不需要使用 `arguments` 对象了。

rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。


解构赋值：

数组 对象 字符串 函数 等等的解构赋值，还得结合实际场景

### 箭头函数
箭头函数表达式的语法比函数表达式更简洁。并且没有自己的 `this arguments super new.target`。
**适用于原本需要匿名表达式的地方**，不能用作构造函数。不能使用 new, 没有原型

箭头函数内部的 this, 指的是『最接近的父级中没有使用箭头函数的作用域』

对于语言新特性的生疏，难免会误用箭头函数，以下场景中**不能**使用箭头函数:
- 对象字面量的方法：对象字面量的方法，方法调用的时候指向的是调用的该对象，但是当使用箭头函数定义对象字面量的方法时，（若是对象在全局环境下定义)，那么该方法内部的this 指向全局环境，即 window
- 构造函数的原型方法：构造函数原型方法，构造函数指向新创建的对象，但是使用箭头函数后确是 window
- 事件回调函数：理应是调用的目标事件对象


### iterator + for...of
JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了Map和Set。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是Map，Map的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内

原生具备 Iterator 接口的数据结构如下。

Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象

调用 Iterator 接口的场合
- 解构赋值
- 扩展运算符
- yield*
- for...of
- Array.from()
- Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
- Promise.all()
- Promise.race()

### proxy

Proxy 用于修改某些操作的默认行为。Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

### async await 知识点（await 的作用，async 返回的是什么）
async 是 Generator 函数的语法糖，改进有以下几点
- 内置执行器
- 更好的语义
- 更广的适用性
- 返回值是 Promise

async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

### generator 又是什么？（es5下generator实现方式)
Generator 函数是 ES6 提供的一种异步编程解决方案

语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）

### Map、Set

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set本身是一个构造函数，用来生成 Set 数据结构。


JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。
为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

