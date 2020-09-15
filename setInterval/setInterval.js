// use setTimeout realize setInterval

class SetInterval {
  timeMap = {};
  id = 0;
  timeId = 0;
  cb = null;
  time = 0;
  setTimeout1(cb, time) {
    this.cb = cb;
    this.time = time;
    this.timeId = this.id;
    this.id++;
    this.timeMap[this.timeId] = setTimeout(() => this.fn(), time);
    return this.timeId;
  }
  fn() {
    this.cb();
    this.timeMap[this.timeId] = setTimeout(() => this.fn(), this.time);
  }
  clearInterval1(id) {
    clearInterval(this.timeMap[id]);
    delete this.timeMap[id];
  }
}

const setInterval1 = new SetInterval();
const timerId = setInterval1.setTimeout1(() => console.log(1), 100);
console.log(timerId);
setTimeout(() => {
  setInterval1.clearInterval1(timerId);
}, 1000);
