#!/usr/bin/env ts-node
{
  function createRepeat(n: number) {
    return "----".repeat(n);
  }

  class Person {
    public children: Person[] = [];
    constructor(public name: string) {}
    sayHi() {
      console.log("Hello, I am " + this.name);
    }
    addChild(child: Person): void {
      this.children.push(child);
    }
    introduceFamily(n?: number): void {
      n = n || 1;
      console.log(`${createRepeat(n - 1)}` + this.name);
      this.children.forEach(child => {
        child.introduceFamily(n + 1);
      });
    }
  }

  let ada = new Person("ada");
  let son1 = new Person("son1");
  let grandson1 = new Person("grandson1");
  let grandson2 = new Person("grandson2");
  let son2 = new Person("son2");
  let grandson3 = new Person("grandson3");
  let grandson4 = new Person("grandson4");
  ada.addChild(son1);
  son1.addChild(grandson1);
  son1.addChild(grandson2);
  ada.addChild(son2);
  son2.addChild(grandson3);
  son2.addChild(grandson4);
  ada.introduceFamily();
}
