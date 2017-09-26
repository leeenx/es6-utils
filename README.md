# es6-utils
本项目用于存放一些 es6 小工具

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
import randomList from `./modules/randomList`; 

// 调用如下
let [keys, vals] = randomList([1, 2, 3, 4, 5], 2, (num) => num>5); 
```
## Chain
创建双向链表的类（构造函数）。**Chain 已弃用不再维护。已经升级至 [Chain_v2](https://github.com/leeenx/es6-utils#chain_v2)** 

语法：
> new Chain(Array)  

将传入的数组转化为一个链表。

**return**: {shift, unshift, pop, push, insertAfter, insertAfter, pointerAt, setPointer, prev, next, curr, first, last, remove, add, clone, splice, slice, concat, length, HEAD, TAIL, POINTER, chain}

| name | type | detail |
| :-- | :-- | :-- |
| shift | Function | 删除链表第一个节点，并返回这个节点。参见数组的 shift |
| unshift | Function | 向链表头部插入一个或多个节点节点。chain.unshift(node1[, node2, node3, ...]); 参见数组的 unshift | 
| pop | Function | 删除链表最后一个，并返回这个节点。参见数组的 pop |
| push | Function | 向链表尾部插入一个或多个节点。chain.push(node1[, node2, node3, ...]); 参考数组的 push | 
| at | Function | 返回指定索引的节点，并将 POINTER 指向当前位置 |
| pointerAt | Function | 返回指定 POINTER 地址的节点 |
| setPointer | Function | 设置 POINTER 地址 |
| prev | Function | 返回当前节点，并把 POINTER 指向上一个节点 |
| next | Function | 返回当前节点，并把 POINTER 指向上一个节点 |
| curr | Function | 返回当前节点 |
| first | Function | 返回头节点 |
| last | Function | 返回尾节点 |
| remove | Function | 删除指定索引范围的节点，返回一个Chain实例。用法：chain.remove(start[, end]) |
| insertAfter | Function | 向指定索引后插入节点。 用法：chain.insertAfter(index, node1[, node2, node3, ...]) |
| insertBefore | Function | 向指定索引前插入节点。用法：chain.insertBefore(index, node1[, node2, node3, ...]) |
| slice | Function | 克隆索引范围的节点，返回一个Chain实例。用法：chain.slice(start[, end]) |
| splice | Function | 删除索引范围的节点，并在 start 处批量插入指定节点，返回一个 Chain 实例。用法：chain.splice(start[, deleteCount, item1, item2, ...]) |
| concat | Function | 合并两个链表。用法：chainA.concat(chainB) |
| clone | Function | 返回一个克隆链表 |
| length | Number | 链表长度 |
| HEAD | Number | 头指针 |
| TAIL | Number | 尾指针 |
| POINTER | Number | 当前位置指针 |
| chain | Array | 存储链表结构的数组 |


Chain的实例同时是一个迭代器。如下：

```javascript
import Chain from './modules/Chain'; 
let chain = new Chain([1, 2, 3, 4, 5, 6, 7]); 
for(let it of chain) {
  console.log(it.data)
}
```
上面代码输出的结果是：1, 2, 3, 4, 5, 6, 7

利用 next/prev 来做迭代，如下：

```javascript
let chain = new Chain([1, 2, 3, 4, 5, 6, 7, 8]), item, i = 0; 
chain.setPointer(3); 
while(item = chain.prev()) {
	console.log(item.data); 
}
```
上面的结果是：4, 3, 2, 1

> **说明：由于最开始的结构设计不合理，导致 concat 的算法复杂度太高，不符合链表的表现。我决定重新设计一个 v2 版本**

## Chain_v2

重新设计改写的 `Chain` 类，一个纯粹的链表类。API 与 `Chain` 几乎一样。

语法：
> new Chain(Array)  

将传入的数组转化为一个链表。

**return**: {shift, unshift, pop, push, insertAfter, insertAfter, prev, next, curr, first, last, remove, add, clone, reverse, slice, splice, concat, reverse, length, *setPointer, *setHead, *setTail, *HEAD, *TAIL, *POINTER, [Symbol.iterator]}

| name | type | syntax | detail |
| :-- | :-- | :-- | :-- |
| shift | Function | chain.shift() | 删除链表第一个节点，并返回这个节点。|
| unshift | Function | chain.unshift(node1[, node2, node3, ...]) | 向链表头部插入一个或多个节点节点。| 
| pop | Function | chain.pop() | 删除链表最后一个，并返回这个节点。 |
| push | Function | chain.push(node1[, node2, node3, ...]) | 向链表尾部插入一个或多个节点。 参考数组的 push | 
| at | Function | chain.at(index) | 返回指定索引的节点，并将 POINTER 指向当前位置 |
| prev | Function | chain.prev() | 返回当前节点，并把 POINTER 指向上一个节点 |
| next | Function | chain.next() | 返回当前节点，并把 POINTER 指向上一个节点 |
| curr | Function | chain.curr() | 返回当前节点 |
| first | Function | chain.first() | 返回头节点 |
| last | Function | chain.last() | 返回尾节点 |
| remove | Function | chain.remove(start[, end]) | 删除指定索引范围的节点，返回一个Chain实例。|
| insertAfter | Function | chain.insertAfter(index, node1[, node2, node3, ...]) | 向指定索引后插入节点。 |
| insertBefore | Function | chain.insertBefore(index, node1[, node2, node3, ...]) | 向指定索引前插入节点。 |
| slice | Function | chain.slice(start[, end]) | 克隆索引范围的节点，返回一个Chain实例。 |
| splice | Function | chain.splice(start[, deleteCount, item1, item2, ...]) | 删除索引范围的节点，并在 start 处批量插入指定节点，返回一个 Chain 实例。 |
| reverse | Function | chain.reverse() | 链表快速反转 | 
| concat | Function | chainA.concat(chainB) | 合并两个链表。 |
| clone | Function | chain.clone() |  返回一个克隆链表 |
| length | Number | chain.length | 链表长度 |
| `*`setPointer | Function | chain.setPointer(node = chain.HEAD) | 设置 POINTER 指针 |
| `*`setHead | Function | chain.setHead(node) | 设置头指针 |
| `*`setTail | Function | chain.setTail(node) | 设置尾指针 |
| `*`HEAD | Object | - | 头指针 |
| `*`TAIL | Object | - | 尾指针 |
| `*`POINTER | Object | - | 当前位置指针 | 
| `*`NEXT | String | - | 前驱别名。勿调用！ |
| `*`PREV | String | - | 后驱别名。勿调用！ |
| [Symbol.iterator] | Symbol | - | 迭代接口 |

**注意加 `*` 的属性表示内部调用**

Chain的实例同时是一个迭代器。如下：

```javascript
import Chain from './modules/Chain'; 
let chain = new Chain([1, 2, 3, 4, 5, 6, 7]); 
for(let it of chain) {
  console.log(it.data)
}
```
上面代码输出的结果是：1, 2, 3, 4, 5, 6, 7

利用 next/prev 来做迭代，如下：

```javascript
let chain = new Chain([1, 2, 3, 4, 5, 6, 7, 8]), item, i = 0; 
chain.setPointer(3); 
while(item = chain.prev()) {
	console.log(item.data); 
}
```
上面的结果是：4, 3, 2, 1

可以跟数组一样操作合并：
```javascript
let chain = new Chain([1, 2, 3, 4, 5]); 
let chain2 = new Chain(["a", "b", "c", "d", "e"]); 
chain.concat(chain2); 
for(let data of chain) {
	console.log(data); 
}
```
输出结果：1, 2, 3, 4, 5, a, b, c, d, e


## timer
统一管理 setTimeout/setInterval 的小库，可以与渲染引擎（如 createjs/PIXI 等）结合使用，也可以单独使用。

默认情况（非游戏开发）：
```javascript
import timer from './modules/timer'; 
let intervalID = timer.setInterval(() => console.log("++1s++"), 1000); 
timer.setTimeout(() => timer.clearInterval(intervalID), 5000); 
```
结合 createjs：
```javascript
import timer from './modules/timer'; 
// 统一 ticker
createjs.Ticker.addEventListener("tick", function(e) {
  e.paused || timer.update(e.delta); 
}); 
// 计时
let intervalID = timer.setInterval(() => console.log("++1s++"), 1000); 
// 5s 后暂停
timer.setTimeout(() => timer.pause(intervaID), 5000);
// 10s 后继续
timer.setTimeout(() => timer.resume(intervaID), 10000);
```

timer 的 APIs 如下：

| name | type | syntax | detail |
| :-- | :-- | :-- | :-- |
| setTimeout | Function | let setTimeoutID = timer.setTimeout(fun, delay[, id]) | 替代原生setTimeout，第三个参数表示指定一个有意义的setTimeoutID |
| clearTimeout | Function | timer.clearTimeout(setTimeoutID) | 清除timer.setTimeout |
| setInterval | Function | let setIntervalID = timer.setInterval(fun, delay[, id]) | 替代原生setInterval，第三个参数表示指定一个有意义的setIntervalID |
| clearInterval | Function | timer.clearInterval(setIntervalID) | 清除timer.clearInterval |
| delete | Function | timer.delete(setTimeoutID/setIntervalID) | 相当于clearTimeout & clearInterval |
| pause | Function | timer.pause(setTimeoutID/setIntervalID) | 暂停指定ID的计时，如果没指定ID表示暂停所有计时 |
| resume | Function | timer.resume(setTimeoutID/setIntervalID) | 恢复指定ID的计时，如果没指定ID表示恢复所有计时 |
| play | Function | timer.play(setTimeoutID/setIntervalID) | 同 resume |
| pauseAll | Function | timer.pauseAll() | 暂停所有计时 |
| playAll | Function | timer.playAll() | 恢复所有计时 | 
| clean | Function | timer.clean() | 清空所有计时 |
| set | Function | timer.set(id, {fn, delay}) | 重置timer的回调函数与delay |
| useRAF | Boolean | timer.useRAF = true / false | true 表示启用自身RAF，false 反之。与第三方ticker结合时，timer 会自动切换 |

## Events
事件管理类。语法如下：

> let event = new Events(); 

event实例的API如下：

| name | type | syntac | deltail |
| :-- | :-- | :-- | :-- |
| on | Function | event.on(eventName, fn) | 监听一个自定义事件 |
| off | Function | event.off(eventName, fn) | 移除监听事件 |
| once | Function | event.once(eventName, fn) | 监听一次自定义事件 |
| dispatch | Function | event.dispatch(eventName, args) | 触发一个自定义事件 |

用法如下：

```javascript
let event = new Events(); 
event.on("haha", function() {
	console.log("haha"); 
}); 
setTimeout(() => event.dispatch("haha")); 
```

## p2angle

计算两点间的角度。用法如下：

```javascript
export p2angle from './modules/p2angle'; 
p2angle.set(0, 0); 
let radian = p2angel.get(100, 100); 
console.log("点(100, 100) 到 原点(0, 0) 的弧度是：" + radian); 
let degree = p2angel.getDegree(100, 100); 
console.log("点(100, 100) 到 原点(0, 0) 的角度是：" + degree); 
```
p2angle的API如下：

| name | type | detail | 
| :-- | :-- | :-- | 
| set | Function | 设置一个原点 | 
| get | Function | 获取当前点到原点的弧度值 |  
| getDegree | Function | 获取当前点到原点的角度值 |

注意，这里的角度的取值请参考下图：

![角度](http://7xv39r.com1.z0.glb.clouddn.com/20170924_coord.gif)



