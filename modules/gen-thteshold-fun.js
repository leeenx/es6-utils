/**
 * @author: leeenx
 * @descriptiton: 创建节流函数
 /*

function genThreshold (fn, threshold = 500) {
  let lock = false
  let nextArg = null
  return (...arg) => {
    if (lock) {
      nextArg = arg
      return
    }
    lock = true
    setTimeout(() => {
      lock = false
      nextArg !== null && fn(...nextArg)
      nextArg = null
    }, threshold)
    fn(...arg)
  }
}
 
