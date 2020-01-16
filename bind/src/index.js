function bind(callThis, ...args) {
  const fn = this
  return function () {
    return fn.call(callThis, ...args)
  }
}

module.exports = bind


if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}