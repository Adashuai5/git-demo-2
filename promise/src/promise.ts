class Promise2 {
  callback = [];
  state = "pending";
  static all: (iterablePromise: any) => Promise2;
  static allSettled: (iterablePromise: any) => Promise2;
  static race: (iterablePromise: any) => Promise2;

  private resolveOrReject(state, data, i) {
    if (this.state !== "pending") return;
    this.state = state;
    nextTick(() => {
      this.callback.forEach((handler) => {
        if (typeof handler[i] === "function") {
          let x;
          try {
            x = handler[i].call(undefined, data);
          } catch (e) {
            return handler[2].reject(e);
          }
          handler[2].resolveWith(x);
        }
      });
    });
  }
  resolve(result) {
    this.resolveOrReject("fulfilled", result, 0);
  }
  reject(reason) {
    this.resolveOrReject("rejected", reason, 1);
  }
  constructor(fn) {
    if (typeof fn !== "function") {
      throw new Error("我只接受函数");
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  then(succeed?, fail?) {
    let handler = [];
    if (succeed) {
      handler[0] = succeed;
    }
    if (fail) {
      handler[1] = fail;
    }
    handler[2] = new Promise2(() => {});
    this.callback.push(handler);
    return handler[2];
  }

  resolveWith(x) {
    if (this === x) {
      this.resolveWithSelf();
    } else if (x instanceof Promise2) {
      this.resolveWithPromise(x);
    } else if (x instanceof Object) {
      this.resolveWithObject(x);
    } else {
      this.resolve(x);
    }
  }

  private resolveWithSelf() {
    this.reject(new TypeError());
  }
  private resolveWithPromise(x) {
    x.then(
      (result) => {
        this.resolve(result);
      },
      (reason) => {
        this.reject(reason);
      }
    );
  }
  private resolveWithObject(x) {
    let then = this.getThen(x);
    if (then instanceof Function) {
      this.resolveWithThenable(x);
    } else {
      this.resolve(x);
    }
  }
  private getThen(x) {
    let then;
    try {
      then = x.then;
    } catch (e) {
      return this.reject(e);
    }
    return then;
  }
  private resolveWithThenable(x) {
    try {
      x.then(
        (y) => {
          this.resolveWith(y);
        },
        (r) => {
          this.reject(r);
        }
      );
    } catch (e) {
      this.reject(e);
    }
  }
}

Promise2.all = (iterablePromise) => {
  let list = [];
  let n = 0;
  let hasError = false;
  return new Promise2((resolve, reject) => {
    for (let i = 0; i < iterablePromise.length; i++) {
      iterablePromise[i].then(
        (data) => {
          list[i] = data;
          n++;
          n === iterablePromise.length && resolve(list);
        },
        (error) => {
          !hasError && reject(error);
          hasError = true;
        }
      );
    }
  });
};

Promise2.allSettled = function (iterablePromise) {
  return Promise2.all(
    ((iterablePromise) =>
      iterablePromise.map((promise) =>
        promise.then(
          (value) => ({
            status: "ok",
            value,
          }),
          (reason) => ({
            status: "not ok",
            reason,
          })
        )
      ))(iterablePromise)
  );
};

Promise2.race = (iterablePromise) => {
  let hasValue = false;
  let hasError = false;
  return new Promise2((resolve, reject) => {
    for (let i = 0; i < iterablePromise.length; i++) {
      iterablePromise[i].then(
        (data) => {
          !hasValue && !hasError && resolve(data);
          hasValue = true;
        },
        (error) => {
          !hasValue && !hasError && reject(error);
          hasError = true;
        }
      );
    }
  });
};

export default Promise2;

function nextTick(fn) {
  // node.js 环境
  if (process !== undefined && typeof process.nextTick === "function") {
    return process.nextTick(fn);
  } else {
    // 浏览器环境
    var counter = 1;
    var observer = new MutationObserver(fn);
    var textNode = document.createTextNode(String(counter));

    observer.observe(textNode, {
      characterData: true,
    });

    counter = counter + 1;
    textNode.data = String(counter);
  }
}
