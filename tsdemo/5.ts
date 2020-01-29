class Animal {
  move(): void {}
}
class Human extends Animal {
  name: string;
  _age: number;
  get age() {
    return this._age;
  }
  set age(value: number) {
    if (value < 0) {
      this._age = 0;
    } else {
      this._age = value;
    }
  }
  constructor(name = "ada", age = 18) {
    super(); // 继承时必须在 constructor 属性上调用 super 才能继承父类属性
    this.name = name;
    this.age = age;
  }
}

let ada = new Human();
console.log(ada.age);

interface Human2 {
  name: string;
  age: number;
  move(): void;
}

function ada3(this: Human2) {
  console.log(this);
}

ada3.call({ name: "ada", age: 18 });

function ada2<Human2>(Human2): Human2 {
  return Human2;
}

console.log(ada2({ name: "ada", age: 18 }));
