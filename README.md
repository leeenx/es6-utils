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

**return**: Array

具体参见：
```javascript
// 引用模块
import randomList from `./modules/randomList.es6`; 

// 调用如下
let newList = randomList([1, 2, 3, 4, 5], 2, (num) => num>5); 
```
