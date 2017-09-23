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
创建双向链表的类（构造函数）。
语法：
> new Chain(Array)  

将传入的数组转化为一个链表。

**return**: {shift, unshift, pop, push, insertAfter, insertAfter, pointerAt, setPointer, prev, next, curr, first, last, remove, add, clone, length, HEAD, TAIL, POINTER, chain}

| name | type | detail |
| :-- | :-- | :-- |
| shift | Function | 删除链表第一个节点，并返回这个节点。参见数组的 shift |
| unshift | Function | 向链表头部插入一个节点。参见数组的 unshift | 
| pop | Function | 删除链表最后一个节点，并返回这个节点。参见数组的 pop |
| push | Function | 向链表尾部插入一个节点。参考数组的 push | 
| at | Function | 返回指定索引的节点，并将 POINTER 指向当前位置 |
| pointerAt | Function | 返回指定 POINTER 地址的节点 |
| setPointer | Function | 设置 POINTER 地址 |
| prev | Function | 返回当前节点，并把 POINTER 指向上一个节点 |
| next | Function | 返回当前节点，并把 POINTER 指向上一个节点 |
| curr | Function | 返回当前节点 |
| first | Function | 返回头节点 |
| last | Function | 返回尾节点 |
| remove | Function | 删除指定索引的节点 |
| insertAfter | Function | 向指定索引后插入节点 |
| insertBefore | Function | 向指定索引前插入节点 |
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
  timer.update(e.paused, e.delta); // 这两个参数是必须的
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



