const bind = require("../src/index");

test1("fn.bind 存在");
test2("绑定 this 成功");
test3("绑定 this, p1, p2 成功");
test4("绑定 this, p1 成功,再传 p2 调用成功");

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
