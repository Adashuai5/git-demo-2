const bind = require("../src/index");

test1("fn.bind 存在");
test2("绑定 this 成功");
test3("绑定 this, p1, p2 成功");
test4("绑定 this, p1 成功,再传 p2 调用成功");
test5("new 的时候绑定了 p1, p2");
test6("new 的时候绑定了 p1, p2，并且 fn 有 prototype.sayHi");
test7("不用 new 但是用类似的对象");

function test1(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  console.assert(Function.prototype.bind2 !== undefined);
}

function test2(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  const fn = function() {
    return this;
  };
  console.assert(fn.bind2({ name: "ada" })().name === "ada");
}

function test3(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  const fn = function(p1, p2) {
    return [this, p1, p2];
  };
  let newFn = fn.bind2({ name: "ada" }, 111, 222);

  console.assert(newFn()[0].name === "ada", "this");
  console.assert(newFn()[1] === 111, "111");
  console.assert(newFn()[2] === 222, "222");
}

function test4(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  const fn = function(p1, p2) {
    return [this, p1, p2];
  };
  let newFn = fn.bind2({ name: "ada" }, 111);

  console.assert(newFn(222)[0].name === "ada", "this");
  console.assert(newFn(222)[1] === 111, "111");
  console.assert(newFn(222)[2] === 222, "222");
}

function test5(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  const fn = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  let fn1 = fn.bind2(undefined, "x", "y");
  let newFn = new fn1();
  console.assert(newFn.p1 === "x");
  console.assert(newFn.p2 === "y");
}

function test6(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  const fn = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  fn.prototype.sayHi = function() {};
  let fn1 = fn.bind2(undefined, "x", "y");
  let newFn = new fn1();
  console.assert(newFn.p1 === "x");
  console.assert(newFn.p2 === "y");
  // console.assert(newFn.__proto__ === fn.prototype);
  console.assert(fn.prototype.isPrototypeOf(newFn));
  console.assert(typeof newFn.sayHi === "function");
}

function test7(message) {
  console.log(message);
  Function.prototype.bind2 = bind;
  const fn = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  fn.prototype.sayHi = function() {};
  const object1 = new fn("a", "b");
  const fn2 = fn.bind2(object1, "x", "y");
  const object = fn2(); // 没有 new
  console.assert(object === undefined, "object 为空");
  console.assert(object1.p1 === "x", "x");
  console.assert(object1.p2 === "y", "y");
}
