### 响应式属性一定要定义在 data 上吗

答案是肯定的，[声明响应式属性](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%A3%B0%E6%98%8E%E5%93%8D%E5%BA%94%E5%BC%8F%E5%B1%9E%E6%80%A7)

> 由于 Vue 不允许动态添加根级响应式属性，所以你必须在初始化实例前声明所有根级响应式属性，哪怕只是一个空值

但是日常开发中我们除了在 `data` 里定义属性外，还会在 `created` 里定义属性，而且因为一些操作，看似在 `created` 里定义的属性也能响应式更新，当初这让我十分困惑。今日又遇到了这个问题，做一下记录📝。

*场景：*

我在 `data` 里初始化了一个属性 `dataVal`, 在 `created` 里初始化了两个值 `createVal1` `createVal2`, 
测试发现：
- 3s 后, 页面上的 `dataVal` 和 `createVal2` 做了更新
- 等到 5s 后, 页面上的 `createVal1` 值也没有更新

```vue
<!-- 栗子 -->
<template>
  <div id="app">
    <div>createVal1： {{createVal1}}</div>
    <div>dataVal： {{dataVal}}</div>
    <div>createVal2： {{createVal2}}</div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      dataVal: '123'
    }
  },
  created() {
    this.createVal1 = 'aaa'
    this.createVal2 = 'bbb'
  },
  mounted() {
    
    setTimeout(() => {
      this.createVal1 = 'mmm'
    }, 5000)

    setTimeout(() => {
      this.dataVal = '456'
      this.createVal2 = 'nnn'
    }, 3000)

  }
}
</script>
```

*解释：*

究其根本，`Vue` 不允许动态添加根级响应式属性，必须在初始化实例前声明所有根级响应式属性。所以在 `created` 里定义的属性不是响应式属性。那为什么在栗子中的 `createVal2` 会响应式更新，是因为它和 `dataVal` 在同一个队列里面。

[异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)

> Vue 在更新 DOM 时是异步执行的, 只要侦听到数据变化，Vue 将开启一个队列，**并缓冲在同一事件循环中发生的所有数据变更**。 

所以 `createVal2` 能和 `dataVal` 这个定义在 `data` 中的响应式属性一同在页面上更新。