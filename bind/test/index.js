const bind = require('../src/index');

Function.prototype.bind2 = bind
console.assert(
  Function.prototype.bind !== undefined
)
console.assert(
  Function.prototype.bind2 !== undefined
)

const fn = function () {
  return this
}

console.assert(
  fn.bind2({ name: 'ada' })().name === 'ada'
)

const fn2 = function (p1, p2) {
  return [this, p1, p2];
};

let newFn = fn2.bind2({ name: 'ada' }, 111, 222)

console.assert(
  newFn()[0].name === 'ada', 'this'
)
console.assert(
  newFn()[1] === 111, '111'
)
console.assert(
  newFn()[2] === 222, '222'
)