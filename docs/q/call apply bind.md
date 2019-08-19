# call apply bind

> - call apply bind 的作用与不同之处
> - 应用

使用 call apply bind 方法调用函数并且指定上下文 this
- call 接收参数列表
- apply 接收参数数组
- bind 返回一个原函数的拷贝，并拥有指定的this值和初始参数。
- call apply 立即执行，bind 返回一个绑定 this 的函数

```js
func.apply(thisArg, [argsArray])
fun.call(thisArg, arg1, arg2, ...)
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

```js
// 测试栗子
var name = 'windowName'
var obj = {
	name: 'shiroumi',
	getName: function() {
		console.log(this.name)
	}
}

obj.getName()

var myName = obj.getName
myName()

var callName = obj.getName.call(obj)

var bindName = obj.getName.bind(obj)
bindName()
```

```js
// 模拟实现 call
Function.prototype._call = function (context) {
	// 首先判断调用方是否是函数
	if(typeof this !== 'function') { // 注意：this 为fun.call(thisArg, arg1, arg2, ...)的func
		throw new Error('调用方必须是函数')
	}
	// context 是参数
	context = context || window // 注意：context 为fun.call(thisArg, arg1, arg2, ...)的thisArg
	let args = [...arguments].slice(1) // arguments 与 context 不一 这行使用 context 报错
	context.fn = this
	let result = context.fn(...args)
	delete context.fn
	return result
}

// 最终效果
var selfCallName = obj.getName._call(obj) 
```

```js
// apply 的实现
Function.prototype._apply = function (context) {
	// 首先判断调用方是否是函数
	if(typeof this !== 'function') {
		throw new Error('调用方必须是函数')
	}
    if (!(arguments[1] instanceof Array)) {
      console.error('可选参数必须是数组')
    }
	context = context || window
	context.fn = this //  this即为调用的方法
	let result = context.fn(...arguments[1]) // 最终都是转换一个个的参数执行
	delete context.fn
	return result
}
```

```js
// bind 的模拟实现
Function.prototype._bind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this
  const args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments) // 注意这个arguments 与外层的不是同一个
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```