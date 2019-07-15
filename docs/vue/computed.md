# Vue 中直接修改计算属性会影响依赖属性吗？
> 计算属性是基于它们的**响应式依赖**进行缓存的，只在相关响应式依赖发生改变时它们才会重新求值。
那么直接修改计算属性会发生什么呢？

我们先来看下官网中的一个例子：
```js
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 仅读取
    aDouble: function () { // ② 依赖的响应式修改，计算属性变为 4
      return this.a * 2
    },
    // 读取和设置
    aPlus: {
      get: function () { // 读取 `vm.aPlus` 走这一步
        return this.a + 1 
      },
      set: function (v) { // 设置 vm.aPlus = 3，先走这一步 ①，此时响应式属性 a 值为 2
        this.a = v - 1
      }
    }
  }
})
vm.aPlus   // => 2
vm.aPlus = 3
vm.a       // => 2
vm.aDouble // => 4
```
流程分析直接写到代码解析里了。总之**直接修改计算属性**会影响依赖的响应式属性，「计算属性」和「响应式依赖」是互相受影响的。那么，我们再来看一个栗子

```js
var vm = new Vue({
  data: { a: 'hello' },
  computed: {
    // 仅读取
    supplement: function () {
      return this.a + 'vue'
    },
    // 读取和设置
    modify: {
      get: function () {
        return this.a + ' day'
      },
      set: function (v) {
        this.a = v + ' yo~'
      }
    }
  }
})
vm.modify   // hello day
vm.modify = 'hello world'
vm.a       // hello world yo~
vm.supplement // hello world yo~ vue
```
当响应式属性类型是字符串的时候，直接修改计算属性的变化也是与上面响应式属性类型是数字变化一样的，但是要注意，字符串只能进行 `+` 操作，不能进行 `-` 行为。

注意： 直接修改计算属性 需要写成 getter 和 setter 方式，否则会报错 `Computed property "XXX" was assigned to but it has no setter.`

综上，不建议直接修改计算属性，而是通过修改依赖的响应式属性进而影响计算属性。不然会导致流程混乱。
