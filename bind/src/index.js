// ES6
function _bind(callThis, ...args) {
  const fn = this;
  function resultFn(...args2) {
    return fn.call(
      // this.constructor === resultFn 可能是继承来的
      // this.__proto__ === resultFn.prototype 不推荐
      // resultFn.prototype.isPrototypeOf(this) 推荐
      this instanceof resultFn ? this : callThis,
      ...args,
      ...args2
    );
  }
  resultFn.prototype = fn.prototype;
  return resultFn;
}

// ES3
var slice = Array.prototype.slice;
function bind(callThis) {
  var fn = this;
  if (typeof fn !== "function") {
    throw new Error("bind 必须绑定在函数身上");
  }
  var args = slice.call(arguments, 1);
  function resultFn() {
    var args2 = slice.call(arguments, 0);
    return fn.apply(
      this instanceof resultFn ? this : callThis,
      args.concat(args2)
    );
  }
  resultFn.prototype = fn.prototype;
  return resultFn;
}

module.exports = bind;

if (!Function.prototype.bind) {
  Function.prototype.bind = bind;
}
