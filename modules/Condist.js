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
        this.options[`${key}: ${value}`] = true
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
  get = name => {
    const { matches, result } = this
    // 搜索范围
    let range = result
    matches.forEach(
      ([ key, value ]) => {
        range = range.filter(
          ({ options }) => options[`${key}: ${value}`] || options[`${key}: ${this.any}`]
        )
      }
    )
    const answerList = range.map(
      ({ answer }) => answer[name]
    )
    return answerList.length === 1 ? answerList[0] : answerList
  }
}
