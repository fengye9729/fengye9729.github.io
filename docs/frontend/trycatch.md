### async 函数的错误处理之使用 try…catch

前端异常处理方法 `try…catch` 能捕获到同步的运行时错误，不能捕获语法错误以及**不能捕获异步错误**

```js
// try catch 不能捕获异步错误
try {
	Promise.reject('出错了')
}catch(e) {
	console.log('捕获到错误：', e)
}

/*
UnhandledPromiseRejectionWarning: 出错了
*/
// ------------------------------------
// try catch 能捕获同步错误
try {
	var name = 'shiroumi'
	console.log(nam)
}catch(e) {
	console.log('捕获到错误：', e)
}
// 捕获到错误： ReferenceError: nam is not defined
```



多个 `await` 语句，任何一个`await`语句后面的 Promise 对象变为`reject`状态，那么整个`async`函数都会中断执行。

```js
// 多个 await 操作，前一个 reject ，会中断程序进行
async function fn() {
	await Promise.reject('出错001')
	await Promise.reject('出错002')
	await Promise.resolve('正确003')
	return await Promise.resolve('正确004')
}
fn().then(v => console.log(v))

// UnhandledPromiseRejectionWarning: 出错001
```



我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将 `await` 放在 `try...catch`结构里面，这样不管这个异步操作是否成功，return 的 `await` 都会执行。

```js
async function fn() {
	try {
		await Promise.reject('出错001')
		await Promise.reject('出错002')
		await Promise.resolve('正确003')
//		return await Promise.resolve('正确004')  // return 放在 try...catch 里面的话 ，返回的为 undefined
	}catch(e) {
		console.log('捕获到异常 ', e)
	}
	
	return await Promise.resolve('正确004')
	
}
fn().then(v => console.log(v))

/*
捕获到异常  出错001
正确004
*/
// 注意 async 函数里面的 return 语句不要放在 try...catch 里

```



`try…catch` 无法捕获异步操作，但是异步操作前如果没有 `await` ，它是不会中断后面的 `await` 的执行的。

```js
async function fn() {
	try {
		Promise.reject('出错000')
		await Promise.reject('出错001')
	}catch(e) {
		console.log('捕获到异常 ', e)
	}
	return await Promise.resolve('正确004')
}
fn().then(v => console.log(v))

/*
捕获到异常  出错001
正确004
UnhandledPromiseRejectionWarning: 出错000
*/
```

因为 `await` 后面跟一个 `Promise` 对象，返回该对象的结果，所以假如 `await` 后面是错误事件，那么返回错误结果，返回的错误不是异步行为，如此错误就能够被 `try…catch` 给捕获到。



综上所述： 多个 `Promise` 执行，前一个 Promise 被  reject  并不会影响后面的 promise 执行。

而在 `await` 情况下，多个 await 语句，任何一个await 语句后面的 Promise 对象变为 reject 状态，那么整个async 函数都会中断执行。

因此  async  函数中的  return  语句不能放在 try…catch 里面。因为一旦  try…catch  里面的 Promise  对象被 reject ，错误被捕获，async 函数 return 的值将不能传递给回调函数



### 应用到实际场景

