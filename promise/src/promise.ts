class Promise2 {
  callback = [];
  state = "pending";
  resolve(result) {
    if (this.state !== "pending") return;
    this.state = "fulfilled";
    setTimeout(() => {
      this.callback.forEach(handler => {
        if (typeof handler[0] === "function")
          handler[0].call(undefined, result);
      });
    }, 0);
  }
  reject(reason) {
    if (this.state !== "pending") return;
    this.state = "rejected";
    setTimeout(() => {
      this.callback.forEach(handler => {
        if (typeof handler[1] === "function")
          handler[1].call(undefined, reason);
      });
    }, 0);
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
    this.callback.push(handler);
  }
}

export default Promise2;
