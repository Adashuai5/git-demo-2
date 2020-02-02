import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import Promise1 from "../src/promise";

chai.use(sinonChai);
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
    let fn = sinon.fake();
    new Promise1(fn);
    assert(fn.called);
  });
  it("new Promise1(fn) 的 fn 接收 resolve 和 reject 两个函数数", done => {
    new Promise1((resolve, reject) => {
      assert.isFunction(resolve);
      assert.isFunction(reject);
      done();
    });
  });
  it("promise.then(success) 的 success 在 resolve 被调用时候执行", done => {
    let success = sinon.fake();
    const promise = new Promise1((resolve, reject) => {
      assert.isFalse(success.called);
      resolve();
      setTimeout(() => {
        assert.isTrue(success.called);
        done();
      });
    });
    // @ts-ignore
    promise.then(success);
  });
  it("promise.then(success, fail) 的 fail 在 reject 被调用时候执行", done => {
    let fail = sinon.fake();
    const promise = new Promise1((resolve, reject) => {
      assert.isFalse(fail.called);
      reject();
      setTimeout(() => {
        assert.isTrue(fail.called);
        done();
      });
    });
    // @ts-ignore
    promise.then(null, fail);
  });
  it("2.2.1 onFulfilled 和 onRejected 都是可选的参数：", () => {
    const promise = new Promise1(resolve => {
      resolve();
    });
    promise.then(false, null);
    assert(1 === 1);
  });
  it("2.2.2 如果 onFulfilled 是函数", done => {
    const succeed = sinon.fake();
    const promise = new Promise1(resolve => {
      assert.isFalse(succeed.called);
      resolve(233);
      resolve(2333);
      setTimeout(() => {
        assert(promise.state === "fulfilled");
        assert.isTrue(succeed.calledOnce); // 2.2.2.2
        assert(succeed.calledWith(233)); // 2.2.2.1
        done();
      }, 0);
    });
    promise.then(succeed);
  });
  it("2.2.3 如果 onRejected 是函数", done => {
    const fail = sinon.fake();
    const promise = new Promise1((resolve, reject) => {
      assert.isFalse(fail.called);
      reject(233);
      reject(2333);
      setTimeout(() => {
        assert(promise.state === "rejected");
        assert.isTrue(fail.calledOnce); // 2.2.2.2
        assert(fail.calledWith(233)); // 2.2.2.1
        done();
      }, 0);
    });
    promise.then(null, fail);
  });
  it("2.2.4 在我的代码执行完之前，不得调用 then 后面的俩函数", done => {
    const succeed = sinon.fake();
    const promise = new Promise1(resolve => {
      resolve();
    });
    promise.then(succeed);
    assert.isFalse(succeed.called);
    setTimeout(() => {
      assert.isTrue(succeed.called);
      done();
    }, 0);
  });
  it("2.2.4 失败回调", done => {
    const fail = sinon.fake();
    const promise = new Promise1((resolve, reject) => {
      reject();
    });
    promise.then(null, fail);
    assert.isFalse(fail.called);
    setTimeout(() => {
      assert.isTrue(fail.called);
      done();
    }, 0);
  });
  it("2.2.5 onFulfilled 和 onRejected 必须被当做函数调用", done => {
    const promise = new Promise1(resolve => {
      resolve();
    });
    promise.then(function() {
      "use strict";
      assert(this === undefined);
      done();
    });
  });
  it("2.2.6.1 then 可以在同一个 promise 里被多次调用", done => {
    const promise = new Promise1(resolve => {
      resolve();
    });
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()];
    promise.then(callbacks[0]);
    promise.then(callbacks[1]);
    promise.then(callbacks[2]);
    setTimeout(() => {
      assert(callbacks[0].called);
      assert(callbacks[1].called);
      assert(callbacks[2].called);
      assert(callbacks[1].calledAfter(callbacks[0]));
      assert(callbacks[2].calledAfter(callbacks[1]));
      done();
    });
  });
  it("2.2.6.2 then可以在同一个promise里被多次调用", done => {
    const promise = new Promise1((resolve, reject) => {
      reject();
    });
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()];
    promise.then(null, callbacks[0]);
    promise.then(null, callbacks[1]);
    promise.then(null, callbacks[2]);
    setTimeout(() => {
      assert(callbacks[0].called);
      assert(callbacks[1].called);
      assert(callbacks[2].called);
      assert(callbacks[1].calledAfter(callbacks[0]));
      assert(callbacks[2].calledAfter(callbacks[1]));
      done();
    });
  });
});
