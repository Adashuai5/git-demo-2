// ES6
function _bind(callThis, ...args) {
  const fn = this;
  function resultFn(...args2) {
    return fn.call(
      this.__proto__ === resultFn.prototype ? this : callThis,
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
  return function() {
    var args2 = slice.call(arguments, 0);
    return fn.apply(callThis, args.concat(args2));
  };
}

module.exports = _bind;

if (!Function.prototype.bind) {
  Function.prototype.bind = _bind;
}
