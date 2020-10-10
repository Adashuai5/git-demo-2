/*
实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
以此类推。
*/
class _LazyMan {
  tasks = [];
  constructor(name) {
    this.pushTask(`Hi This is ${name}!`);
    setTimeout(() => {
      this.next();
    }, 0);
  }

  next() {
    const task = this.tasks.shift();
    task && task();
  }

  sleep(time) {
    this.asyncTask(time, false);
    return this;
  }

  sleepFirst(time) {
    this.asyncTask(time, true);
    return this;
  }

  eat(name) {
    this.pushTask(`Eat ${name}!`);
    return this;
  }

  pushTask(text) {
    const task = () => {
      console.log(text);
      this.next();
    };
    this.tasks.push(task);
  }

  asyncTask(time, first) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}!`);
        this.next();
      }, time);
    };
    if (first) {
      this.tasks.unshift(task);
    } else {
      this.tasks.push(task);
    }
  }
}

function LazyMan(name) {
  return new _LazyMan(name);
}

// LazyMan("Hank");
// LazyMan('Hank').sleep(10).eat('dinner')
// LazyMan('Hank').eat('dinner').eat('supper')
LazyMan("Hank").sleepFirst(5).eat("supper");
