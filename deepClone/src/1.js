const getKeySize = (obj) => {
  let n = 0
  if (typeof obj !== 'object') return n
  for (item in obj) {
    n += 1
    if (typeof obj[item] === 'object') {
      n += getKeySize(obj[item])
    }
  }
  return n
}



const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
      f: 4,
      g: {
        h: 5
      }
    }
  }
}
console.log(getKeySize(obj))