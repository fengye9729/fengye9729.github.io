# async-await
> async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果

async 是将多个异步操作，包装成一个 Promise 对象，**await 是内部 then 命令的语法糖**

async 函数**返回一个 Promise 对象**，可以使用 then 方法添加回调函数。

当函数执行的时候，遇到 await 就会先返回，等到异步操作完成，再接着执行函数体后的语句。

async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数

正常情况下，await 命令后是一个 Promise 对象，返回该对象的结果；如果不是 Promise 对象，就直接返回对应的值

任何一个 await 语句后面的 Promise 对象变为 reject 状态，那么整个 async 函数都会中断执行。【在使用 await 场景下】有时候，**希望即使前一个异步操作失败，也不要中断后面的异步操作。** 这时候，将第一个 await 放在 try...catch 结构里。这样不管这个异步操作是否成功，第二个 await 都会执行

```js
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world
```
另一种方法是 await 后面的 Promise 对象再跟一个 catch 方法，处理前面可能出现的错误

```js
async function f() {
      await Promise.reject('出错了')
        .catch(e => console.log(e));
      return await Promise.resolve('hello world');
    }
    
f()
.then(v => console.log(v))
// 出错了
// hello world
```

### 使用注意点
1. 将 await 命令放到 `try...catch` 代码块
2. 多个 await 命令后面的异步操作，如果不存在先后顺序，最后让它们同时出发，这样能缩短程序的执行时间

```js
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```
3. await 只能用在 async 函数之中，用在普通函数中会报错
  1. 如果将 `forEach` 方法的参数改成 `async` 函数，也会有问题

  **await 在 forEach 中不生效**

  如果确实希望多个请求并发执行，可以使用 `Promise.all` 方法。

4. async 函数可以保留运行堆栈

```js
// 继发操作
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
// map 是能够并发操作
async function logInOrder(urls) {
  // map并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```