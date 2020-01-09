function deepClone(source) {
  if (source instanceof Object) {
    if (source instanceof Array) {
      const array = new Array()
      for (let key in source) {
        array[key] = deepClone(source[key])
      }
      return array
    }
    if (source instanceof Function) {
      // 通过调用自己本身获取 this 和 参数
      const fn = function() {
        return source.apply(this, arguments)
      }
      for (let key in source) {
        fn[key] = deepClone(source[key])
      }
      return fn
    }
    const obj = new Object()
    for (let key in source) {
      obj[key] = deepClone(source[key])
    }
    return obj
  }
  return source
}

module.exports = deepClone
//
