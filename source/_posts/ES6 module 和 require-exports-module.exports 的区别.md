---
title: ES6 module 和 require/exports/module.exports 的区别
date: 2018-05-29
tags: 
- ES6 
- ES5
---
## ES6 module 与 CommonJS 模块加载的区别

在 ES6 之前，社区制定了一些`模块加载方案`，最主要的有 `CommonJS` 和 `AMD` 两种。前者用于服务器，后者用于浏览器。

ES6 模块的设计思想是尽量的`静态化`，使得`编译时`就能确定模块的依赖关系，以及输入和输出的变量

`CommonJS` 和 `AMD` 模块，都只能在`运行时`确定这些东西。

- ES6 module 中导入模块的属性或者方法是强绑定的，包括基础类型；CommonJS 则是普通的值传递或者引用传递
- CommonJS 模块是运行时的，导入导出是通过值的复制；ES6 module是静态的，导入导出实际上是建立符号的映射
- `import` 文件必须放在顶部，`require` 不需要；`import/export` 最终会被 `babel` 编译成 `require/exports`
- CommonJS 规范规定，每个模块内部， module 变量代表当前模块，这个变量是一个对象，它的 exports属性（即 module.exports）是对外的接口。

```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');
// 整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”
```

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
// 从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。
```

## ES6 module 的好处

- 静态加载
- 不再需要UMD模块格式了
- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
- 不再需要对象作为命名空间（比如Math对象）
