class Promise1 {
  callback = [];
  state = "pending";
  static all: (iterablePromise: any) => Promise1;
  static race: (iterablePromise: any) => Promise1;
  static allSettled: (iterablePromise: any) => Promise1;

  private resolveOrReject(state, data, i) {
    if (this.state !== "pending") return;
    this.state = state;
    nextTick(() => {
      this.callback.forEach((handler) => {
        if (typeof handler[i] === "function") {
          try {
            handler[i].call(undefined, data);
          } catch (e) {
            return handler[2].reject(e);
          }
        }
      });
    });
  }

  constructor(fn) {
    if (typeof fn !== "function") throw new Error("not Function");

    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(result) {
    this.resolveOrReject("fulfilled", result, 0);
  }

  reject(reject) {
    this.resolveOrReject("rejected", reject, 1);
  }

  then(succeed?, fail?) {
    const handler = [];
    succeed && (handler[0] = succeed);
    fail && (handler[1] = fail);
    handler[2] = new Promise1(() => {});
    this.callback.push(handler);
    return handler[2];
  }
}

Promise1.all = (iterablePromise) => {
  let list = [];
  let n = 0;
  let hasError = false;
  return new Promise1((resolve, reject) => {
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

Promise1.allSettled = function (iterablePromise) {
  return Promise1.all(
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

Promise1.race = (iterablePromise) => {
  let hasValue = false;
  let hasError = false;
  return new Promise1((resolve, reject) => {
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

export default Promise1;

const nextTick = (fn) => {
  if (process !== undefined && typeof process.nextTick === "function") {
    return process.nextTick(fn);
  }
  let counter = 1;
  const textNode = document.createTextNode(String(counter));
  const observer = new MutationObserver(fn);
  observer.observe(textNode, {
    characterData: true,
  });
  counter += 1;
  textNode.data = String(counter);
};
