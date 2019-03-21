/**
 * @author leeenx
 * @description 一个简单动画函数
 */

import timer from './timer'

const {
  PI,
  cos
} = Math

const EASE_FUNCS = {
  ease: x => -(cos(PI * x) - 1) / 2,
  linear: x => x
}

let timerStamp = 0

// 兼容 ie8~ie9的动画
export default function anim ({ target, duration, ease = 'ease' }) {
  const easeFun = EASE_FUNCS[ease]
  // 生成一个唯一的 timeID
  const timeID = `anim-${Date.now()}-${++timerStamp}`
  // 单位
  const unit = {}
  function from (startAttrs = {}) {
    for (const key in startAttrs) {
      const value = startAttrs[key]
      target[key] = value
      unit[key] = value.replace(/^-?\d+(\.\d+)?/, '')
      // 去单位
      startAttrs[key] = parseFloat(
        startAttrs[key].replace(unit[key], '')
      )
    }
    return { to: to(startAttrs) }
  }
  function to (startAttrs) {
    return endAttrs => new Promise(
      resolve => {
        const attrs = {}
        for (const key in endAttrs) {
          const startAttr = startAttrs[key]
          const endAttr = parseFloat(
            endAttrs[key].replace(unit[key], '')
          )
          attrs[key] = endAttr - startAttr
        }
        let elapse = 0
        const stay = 16.666
        timer.setInterval(
          () => {
            elapse += stay
            if (elapse >= duration) {
              // 运动结束
              elapse = duration
              timer.delete(timeID)
              resolve(endAttrs)
            }
            for (const key in endAttrs) {
              target[key] = `${startAttrs[key] + (attrs[key] * easeFun(elapse / duration))}${unit[key]}`
            }
          },
          stay,
          timeID
        )
      }
    )
  }
  function destory () {
    timer.delete(timeID)
  }
  return { from, to, destory }
}
