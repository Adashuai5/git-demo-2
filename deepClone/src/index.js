let cache = []
function deepClone(source) {
  if (source instanceof Object) {
    let cachedDist = findCache(source)
    if (cachedDist) {
      return cachedDist
    } else {
      let dist
      if (source instanceof Array) {
        dist = new Array()
      } else if (source instanceof Function) {
        // 通过调用自己本身获取 this 和 参数
        dist = function () {
          return source.apply(this, arguments)
        }
      } else if (source instanceof RegExp) {
        dist = new RegExp(source.source, source.flags)
      } else if (source instanceof Date) {
        dist = new Date(source)
      } else {
        dist = new Object()
      }
      cache.push([source, dist])
      // 通过 hasOwnProperty 判断 key 是否为 source 自身属性
      for (let key in source) if (source.hasOwnProperty(key)) {
        dist[key] = deepClone(source[key])
      }
      return dist
    }
  }
  return source
}

function findCache(source) {
  for (let i = 0; i < cache.length; i++) {
    if (cache[i][0] === source) {
      return cache[i][1]
    }
  }
  return undefined
}

module.exports = deepClone
//
