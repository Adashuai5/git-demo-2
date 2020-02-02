import * as chai from "chai";
import Promise1 from "../src/promise";

const assert = chai.assert;

describe("Chai 能用", () => {
  it("是一个类", () => {
    assert.isFunction(Promise1);
    assert.isObject(Promise1.prototype);
  });
  it("new Promise1() 必须接受一个为函数参数，否则报错", () => {
    assert.throw(() => {
      // @ts-ignore
      new Promise1();
    });
    assert.throw(() => {
      // @ts-ignore
      new Promise1(1);
    });
    assert.throw(() => {
      // @ts-ignore
      new Promise1(true);
    });
  });
  it("new Promise1(fn) 会生成一个有 then 方法的对象", () => {
    const promise = new Promise1(() => {});
    assert.isFunction(promise.then);
  });
  it("new Promise1(fn) 的 fn 立即执行", () => {
    let called = false;
    new Promise1(() => {
      called = true;
    });
    // @ts-ignore
    assert(called === true);
  });
  it("new Promise1(fn) 的 fn 接收 resolve 和 reject 两个函数数", () => {
    let called = false;
    new Promise1((resolve, reject) => {
      called = true;
      assert.isFunction(resolve);
      assert.isFunction(reject);
    });
    // @ts-ignore
    assert(called === true);
  });
  it("promise.then(success) 的 success 在 resolve 被调用时候执行", done => {
    let called = false;
    const promise = new Promise1((resolve, reject) => {
      assert(called === false);
      resolve();
      setTimeout(() => {
        assert(called === true);
        done();
      });
      console.log("代码执行了");
    });
    // @ts-ignore
    promise.then(() => {
      called = true;
    });
  });
});
