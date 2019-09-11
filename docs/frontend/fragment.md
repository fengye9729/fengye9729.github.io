# fragment

```js
function nodeToFragment (el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
        // 将Dom元素移入fragment中
        fragment.appendChild(child);
        child = el.firstChild
    }
    return fragment;
}
```
看作有两个容器，真实dom是一个容器，fragment也是一个容器。假设真实dom有一个名为app的节点，它有三个子节点，分别为child1、child2、child3。nodeToFragment这个方法就是要将 app 节点下面的所有节点移至到 fragment 容器内。

第一次令 `child = el.firstChild`，这里 el 即是 app 节点，则 child 则是child1，执行 `fragment.appendChild(child)` 后，fragment里面就出现child1节点了。此时要注意 appendChild 这个方法是将dom节点**进行移动，而不是copy**，所以节点app下面的子节点只剩下child2，child3。

第二次child = el.firstChild，这里el还是app节点，但是child变成child2，因为之前的child1已经被移动出去了啦。再次执行fragment.appendChild(child)，则fragment里面就有child1、child2，而同理节点app下面只剩下child3节点了。

第三次child = el.firstChild，这时候child已经为child3了啦，执行fragment.appendChild(child)，则fragment里面就有child1、child2、child3，而节点app下就啥都没有了。

第四次child = el.firstChild，则child为null，跳出循环.


### fragment 
```js
let fragment = document.createDocumentFragment();
```

DocumentFragments 是DOM节点。它们不是主DOM树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。在DOM树中，文档片段被其所有的子元素所代替。

因为文档片段存在于内存中，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。


[来源](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment)

> 个人理解

fragement 相当于一个容器，将动态创建的元素放入容器中，再一次性添加到页面，如此引发一次回流。动态操作的时候不作用在已存在的页面元素，而是在内存中进行大量的操作，如此提高性能。