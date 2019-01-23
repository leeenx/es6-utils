// 条件列表管理

export default class Condist {
  result = []
  // 待存储条件项
  options = {}
  // 待匹配条件项
  matches = []
  static any = `any-${Date.now()}`
  any = Condist.any
  add (options) {
    Object.entries(options).forEach(
      ([ key, value ]) => {
        // 转成字符串存储
        this.options[key] = value
      }
    )
    const { add, any, set } = this
    // 暴露三个 APIs
    return { add, any, set }
  }
  set = answer => {
    const { options } = this
    // 按条件存储
    this.result.push({
      options,
      answer
    })
    this.options = {}
    return this
  }
  is = options => {
    Object.entries(options).forEach(
      ([ key, value ]) => {
        this.matches.push([key, value])
      }
    )
    const { is, get } = this
    // 暴露两个 APIs
    return { is, get }
  }
  getList = (name = '') => {
    const { matches, result } = this
    // 搜索范围
    let range = result
    matches.forEach(
      ([ key, value ]) => {
        range = range.filter(
          ({ options }) => {
            const optValue = options[key]
            if (typeof value !== 'object') {
              return (
                optValue === value ||
                optValue === Condist.any
              )
            } else if (typeof optValue === 'object') {
              // 如果是 Object/Array 只做浅层比对
              if (value instanceof Array) {
                // 数组
                return (
                  value.length === optValue.length &&
                  value.every(
                    (item, index) => item === optValue[index]
                  )
                )
              }
              // 对象
              return (
                () => {
                  for (const name of value) {
                    if (value[name] !== optValue[name]) {
                      return false
                    }
                  }
                  for (const name of optValue) {
                    if (value[name] !== optValue[name]) {
                      return false
                    }
                  }
                  return true
                }
              )
            }
            return false
          }
        )
      }
    )
    const answerList = range.map(
      ({ answer }) => {
        let key = name
        if (name === '') {
          const keys = Object.keys(answer)
          if (keys.length === 1) {
            // 没有 name
            key = keys[0]
          } else {
            throw new Error('缺少参数')
          }
        }
        return answer[key]
      }
    )
    return answerList
  }
  get = name => {
    const answerList = this.getList(name)
    if (answerList.length === 0) {
      console.error('No any answer is matched!')
    } else if (answerList.length > 1) {
      console.error(`There're ${answerList.length} answers matched, you can use API:getList instead`)
    }
    return answerList[0]
  }
}
