# es6-utils
本项目用于存放本人的一些 es6 小工具

## randomList
随机打散数组，并返回指数量与指定条件的数组。

语法：
> randomList(list, count, filter)  

**parameters**

| name | type | detail |
| :-- | :-- | :-- |
| list | Array | 目标数组 |
| count | Number | 返回的数组的个数 | 
| filter | Function | 过滤条件函数 |

**return**: [keys, vals]

具体参见：
```javascript
// 引用模块
import randomList from `./modules/randomList.es6`; 

// 调用如下
let [keys, vals] = randomList([1, 2, 3, 4, 5], 2, (num) => num>5); 
```
## Chain
创建双向链表的类（构造函数）。
语法：
> new Chain(Array)  

将传入的数组转化为一个链表。

**return**: {shift, unshift, pop, push, at, first, last, remove, add, clone, length}

| name | type | detail |
| :-- | :-- | :-- |
| shift | Function | 删除链表第一个节点，并返回这个节点。参见数组的 shift |
| unshift | Function | 向链表头部插入一个节点。参见数组的 unshift | 
| pop | Function | 删除链表最后一个节点，并返回这个节点。参见数组的 pop |
| push | Function | 向链表尾部插入一个节点。参考数组的 push | 
| at | Function | 返回指定索引的节点 |
| first | Function | 返回头节点 |
| last | Function | 返回尾节点 |
| remove | Function | 删除指定索引的节点 |
| add | Function | 向指定索引处插入节点 |
| clone | Function | 返回一个克隆链表 |
| length | Number | 链表长度 |

Chain的实例同时是一个迭代器。如下：

```javascript
import Chain from './modules/Chain'; 
let chain = new Chain([1, 2, 3, 4, 5, 6, 7]); 
for(let it of chain) {
  console.log(it.item)
}
```
上面代码输出的结果是：1, 2, 3, 4, 5, 6, 7

