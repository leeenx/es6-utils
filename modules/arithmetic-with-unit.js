/**
 * 带单位的简单运算
 * @param {string} firstValue - [必须]被运算的数
 *
 * const res = arithmeticWithUnit('20px').add('20px').exec()
 * console.log(res) // '40px'
 */
function arithmeticWithUnit (firstValue) {
  const unit = firstValue.replace(/^[0-9.]+/, '')
  let res = parseFloat(firstValue.replace(unit, ''))
  const methods = {}

  /**
   * 加法
   * @description 加法运算
   * @param {string} value - [必须]加数
   */
  function add (value) {
    res += parseFloat(value.replace(unit, ''))
    return methods
  }

  /**
   * 减法
   * @description 减法运算
   * @param {string} value - [必须]减数
   */
  function subtract (value) {
    res -= parseFloat(value.replace(unit, ''))
    return methods
  }

  /**
   * 乘法
   * @description 乘法运算
   * @param {string} value - [必须]乘数
   */
  function multiply (value) {
    res *= value
    return methods
  }

  /**
   * 除法
   * @description 除法运算
   * @param {string} value - [必须]除数
   */
  function divide (value) {
    res /= value
    return methods
  }

  /**
   * 最小值
   * @description 取两数中的最小值
   * @param {string} value - [必须]比较值
   */
  function min (value) {
    res = Math.min(parseFloat(value.replace(unit, '')), res)
    return methods
  }

  /**
   * 最大值
   * @description 取两数中的最大值
   * @param {string} value - [必须]比较值
   */
  function max (value) {
    res = Math.min(parseFloat(value.replace(unit, '')), res)
    return methods
  }

  /**
   * 合并单位
   * @description 运算完后的值带上单位
   */
  function exec () {
    return res + unit
  }
  Object.assign(
    methods,
    { add, subtract, multiply, divide, min, max, exec }
  )
  return methods
}
