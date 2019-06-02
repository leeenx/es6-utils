/**
 * 日期处理集合
 * @description 处理日期的方法集合
 */
const dateSet = {
  /**
   * 日期加法
   * @description 返回 date + offset 的结果值
   * @param {date} date - [必须]被处理的日期
   * @param {number} [offset=0] - 日期的累加值，默认为 0
   * @param {string} [type=date] - 处理维度类型，默认是天数。可选：year, month, week, date, hour, minute, second, millisecond
   *
   * @returns {date} 返回相加的结果
   * @example
   * const today = new Date('2018-03-08 00:00:00')
   * const tomorrow = DateSet.add(today, 1, 'date') // Fri Mar 09 2018 00:00:00 GMT+0800 (中国标准时间)
   */
  add (date, offset = 0, type = 'date') {
    // 克隆时期，防止覆盖原来日期
    date = new Date(date)
    switch (type) {
      case 'year': date.setYear(date.getFullYear() + offset); break
      case 'month': date.setMonth(date.getMonth() + offset); break
      case 'week': date.setDate(date.getDate() + (7 * offset)); break
      case 'hour': date.setHours(date.getHours() + offset); break
      case 'minute': date.setMinutes(date.getMinutes() + offset); break
      case 'second': date.setSeconds(date.getSeconds() + offset); break
      case 'millisecond': date.setMilliseconds(date.getMilliseconds() + offset); break
      // 默认是天
      default: date.setDate(date.getDate() + offset)
    }
    return date
  },

  /**
  * 日期相减
  * @description 返回 date1 - date2 的结果值，默认返回天数
  * @param {Date} date1 - [必须]日期被减数
  * @param {Date} date2 - [必须]日期减数
  * @param {String} [type=date] - 处理维度类型，默认是天数。可选：date, hour, minute, second, millisecond
  *
  * @returns {number} 日期相差值。默认是相差天数
  * @example
  * const today = new Date('2018-03-08 00:00:00')
  * const lastDay = new Date('2018-03-07 00:00:00')
  * const diff = DateSet.subtract(today, lastDay, 'date') // 1
  * */
  subtract (date1, date2, type) {
    // date1, date2 转成可运算的 Date 类型
    date1 = this.invertParse(date1)
    date2 = this.invertParse(date2)
    let difference = date1.getTime() - date2.getTime()
    switch (type) {
      case 'hour': difference /= (60 * 60 * 1000); break
      case 'minute': difference /= (60 * 1000); break
      case 'second': difference /= 1000; break
      case 'millisecond': difference /= 1; break
      default: difference /= (24 * 60 * 60 * 1000)
    }
    return difference
  },

  /**
   * 转换时间显示格式
   * @description 按指定的 pattern 格式返回日期
   * @param {date} date 目标日期
   * @param {string} pattern 格式化的模式:
   * YYYY - 四位的年份
   * MM - 月份
   * DD - 日期
   * hh - 小时
   * mm - 分钟
   * ss - 秒钟
   * ms - 毫秒
   *
   * @returns {string} 返回指定显示格式的日期
   * @example
   * const date = DateSet.parse(new Date('2018/01/01'), 'YYYY-MM-DD') // 2018-01-01
   */
  parse (date, pattern = 'YYYY-MM-DD') {
    const fullYear = date.getFullYear()
    const year = date.getYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const millisecond = date.getMilliseconds()
    const match = {
      YYYY: fullYear,
      YY: year,
      MM: month + 1,
      DD: day,
      hh: hour,
      mm: minute,
      ss: second,
      ms: millisecond
    }
    let parseDate = pattern
    // 匹配
    for (const key in match) {
      parseDate = parseDate.replace(key, match[key])
    }
    return parseDate
  },

  /**
   * 时间字符串反向转化
   * @description 将格式化后的日期字符串转成 Date 类型
   * @param {string} strDate 格式化后的日期
   *
   * @returns {date} 返回日期类型对象
   * @example
   * const date = DateSet.invertParse('2018/03/08') // Thu Mar 08 2018 00:00:00 GMT+0800 (中国标准时间)
   */
  invertParse (strDate) {
    // Date 类型直接返回
    if (strDate instanceof Date) return strDate
    return new Date(strDate)
  }
}

export default dateSet
