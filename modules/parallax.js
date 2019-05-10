/**
 * @author leeenx
 * @description 非感应式视差组件
 */
import { Timer } from './timer'

// 运动半径
const RADIUS = 10
// 间隔
const INTERVAL = 200

export default class Parallax {
  constructor ($container = null) {
    if ($container !== null) {
      const $sheets = $container.querySelectorAll('[data-depth]')
      this.sheets = []
      // 强转数组
      for (var i = 0, len = $sheets.length; i < len; ++i) {
        const $sheet = $sheets[i]
        // 添加 transition
        $sheet.style['-webkit-transition'] = `-webkit-transform ${INTERVAL}ms linear, transform ${INTERVAL}ms linear`
        const depth = parseFloat($sheet.dataset.depth)
        // depth 大于0才有意义
        depth && this.sheets.push({
          $sheet,
          depth
        })
      }
      // 一个组件一个timer
      this.timer = new Timer()
      this.start()
    }
  }
  mockMotion (depth) {
    // 虚拟运动，返回[x, y]
    const radian = Math.random() * 2 * Math.PI
    const x = Math.cos(radian) * RADIUS * depth
    const y = Math.sin(radian) * RADIUS * depth
    return { x, y }
  }
  start () {
    // 开始视差运动
    this.timer.setInterval(() => {
      this.sheets.forEach(({ $sheet, depth }) => {
        const { x, y } = this.mockMotion(depth)
        $sheet.style['-webkit-transform'] = `translate3d(${x}px, ${y}px, 0)`
      })
    }, INTERVAL)
  }
  enable () {
    // 开启
    this.timer.resume()
  }
  disable () {
    // 关闭
    this.timer.pause()
  }
}
