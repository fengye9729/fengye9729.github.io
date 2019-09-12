# Vue 中的 key 有什么用？

> - 为什么要使用 key? 
> - 不使用 key 会怎样？
> - 循环列表的 key 为什么最好不要用 index
> - 就地复用是什么？
> - diff 操作？

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。

key 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。

key 是为 Vue 中的 Vnode 标记的唯一 id ,通过这个 key ,我们的 diff 操作可以更准确、更快速。

diff 算法的过程中, 先会进行新旧节点的首尾交叉对比, 当无法匹配的时候会用新节点的 key 与旧节点进行比对,然后找出差异。

提升diff【同级比较】的效率，对比要实现前后列表的diff，如果对列表的每一项增加一个key，即唯一索引，那就可以很清楚的知道两个列表谁少了谁没变。而如果不加key的话，就只能一个个对比了。

- 准确: 如果不加 key,那么 vue 会选择复用节点(Vue 的就地更新策略), 导致之前节点的状态被保留下来, 会产生一系列的 bug
- 快速: key 的唯一性可以被 Map 数据结构充分利用, 相比于遍历查找的时间复杂度 O(n), Map的时间复杂度仅仅为 O(1)

(Vue)key 的作用是为了在数据变化时**强制更新组件**，以避免“就地复用”带来的副作用。
- 比如可能不会产生过渡效果
- 或者在某些节点有绑定数据（表单）状态，会出现状态错位
  - 具体来说：比如允许用户在不同的登录方式之间的切换，由于两个模板使用了相同的元素
  ，输入的数据不会被替换掉

```js
function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for(i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if(isDef(key)) map[key] = i
  }
  return map
}
```

> 为什么列表循环渲染的 key 最好不要使用 index

举栗子：
```js
变化前数组的值是[1,2,3,4]，key就是对应的下标：0，1，2，3
变化后数组的值是[4,3,2,1]，key对应的下标也是：0，1，2，3
// 列表数据修改的时候,他会根据key值去判断某个值是否修改
// 如果修改,则重新渲染这一项,否则复用之前的元素;
```
那么diff算法在变化前的数组找到key =0的值是1，在变化后数组里找到的key=0的值是4
因为子元素不一样就重新删除并更新
但是如果加了唯一的key,如下:
```
变化前数组的值是[1,2,3,4]，key就是对应的下标：id0，id1，id2，id3
变化后数组的值是[4,3,2,1]，key对应的下标也是：id3，id2，id1，id0
```
那么diff算法在变化前的数组找到key =id0的值是1，在变化后数组里找到的key=id0的值也是1
因为子元素相同，就不删除并更新，只做移动操作，这就提升了性能

> key 的用途

- v-for
- 完整地触发组件的生命周期钩子
- 触发过渡

[参考](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/1)