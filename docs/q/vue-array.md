# vue 是如何对数组方法进行变异的
> 数组更新检测

Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

对于这些变异方法 vue 做了包裹，在原型上进行了拦截，调用原生的数组方法后，还会执行发布和变更的操作来触发视图的更新。

```js
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsToPatch.forEach(function (method) {  
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2) // 为什么？？？
        break
    }
    if (inserted) ob.observeArray(inserted)
    ob.dep.notify()
    return result
  })
})

observeArray(items: Array<any>) {
  for (let i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}

export function observe(value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }
  let ob: Observer | void;
  if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}
```
简单来讲，重写了数组中的那些方法，首先获取到这个数组的 `__ob__` ,也就是它的 `Observer` 对象，如果有新的值，就调用 `observeArray` 继续对新的值观察变化，然后手动调用 `notify` ，通知渲染 `watcher` ，执行 `update`

> 为什么要对数组进行单独处理

在 Vue 现有阶段中，对响应式处理利用的是 `Object.defineProperty` 对数据进行拦截，而这个方法对数组有一些限制，并**不能监听到数组增删**等，所以我们需要对这些操作进行 hack，让 vue 能监听到其中的变化。

实际上，`Object.defineProperty` 对数组已有元素是能够实现监听的，使得 `vm.items[indexOfItem] = newValue` 方式为响应式，但是 Vue 给它限制住了，根本原因是**性能上的考量**，尤大认为**性能代价和获得的用户体验收益不成正比**

[参考](https://segmentfault.com/a/1190000015783546)