// es6 随机按顺序数组
export default (list = [], count = list.length, filter) => 
{
    list = [].concat(list); // 切断与参数list 的耦合
    list = typeof filter === "function" ? list.filter( (...args) => filter(...args) ) : list; 
    let [keys, vals] = [[], []]; 
    for(let i=0; i<count; ++i) {
        let [len, randomIndex] = [list.length, (Math.random() * list.length)>>0]; 
        keys.push(randomIndex); 
        vals = vals.concat(list.splice(randomIndex, 1)); 
    }
    return vals.length == 0 ? [-1, NaN] : vals.length == 1 ? [keys[0], vals[0]] : [keys, vals]; 
}
