const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;
const DeepClone = require("../src/index");

describe("DeepClone", () => {
  it("是一个类", () => {
    assert.isFunction(DeepClone);
  });
  it("能够复制基本类型", () => {
    const n = 123;
    const n1 = new DeepClone().clone(n);
    assert.equal(n, n1);
    const s = "123";
    const s1 = new DeepClone().clone(s);
    assert.equal(n, s1);
    const b = true;
    const b1 = new DeepClone().clone(b);
    assert.equal(b, b1);
    const u = undefined;
    const u1 = new DeepClone().clone(u);
    assert.equal(u, u1);
    const empty = null;
    const empty1 = new DeepClone().clone(empty);
    assert.equal(empty, empty1);
    // Symbol 不细究了
    const symbol = Symbol();
    const symbol1 = new DeepClone().clone(symbol);
    assert(symbol === symbol1);
  });
  describe("对象", () => {
    it("能够复制对象", () => {
      const a = { name: "ada", child: { name: "little ada" } };
      const a1 = new DeepClone().clone(a);
      assert(a !== a1);
      assert(a.name === a1.name);
      assert(a.child !== a1.child);
      assert(a.child.name === a1.child.name);
    });
    it("能够复制数组", () => {
      const a = [
        [1, 2, 3],
        [2, 3, 4],
        [12, 23, 34]
      ];
      const a1 = new DeepClone().clone(a);
      assert(a[0] !== a1[0]);
      assert(a[1] !== a1[1]);
      assert(a[2] !== a1[2]);
      assert.deepEqual(a, a1);
    });
    it("能够复制函数", () => {
      const a = function() {
        return 1;
      };
      a.xxx = { yyy: { zzz: 1 } };
      const a1 = new DeepClone().clone(a);
      assert(a !== a1);
      assert(a.xxx.yyy.zzz === a1.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a1.xxx.yyy);
      assert(a.xxx !== a1.xxx);
      assert(a() === a1());
    });
    it("能够复制环", () => {
      const a = { name: "ada", child: { name: "little ada" } };
      a.self = a;
      const a1 = new DeepClone().clone(a);
      assert(a !== a1);
      assert(a.name === a1.name);
      assert(a.self !== a1.self);
    });
    // xit 表示不测试，我们不考虑爆栈的情况
    xit("不会爆栈", () => {
      const a = { child: null };
      let b = a;
      for (let i = 0; i < 5458; i++) {
        b.child = { child: null };
        b = b.child;
      }
      const a1 = new DeepClone().clone(a);
      assert(a !== a1);
      assert(a.child !== a1.child);
    });
    it("能够复制正则", () => {
      // new RegExp(source, flags)
      const a = new RegExp("hi\\d+", "gi");
      a.xxx = { yyy: { zzz: 1 } };
      const a1 = new DeepClone().clone(a);
      assert(a !== a1);
      assert(a.source === a1.source);
      assert(a.flags === a1.flags);
      assert(a.xxx.yyy.zzz === a1.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a1.xxx.yyy);
      assert(a.xxx !== a1.xxx);
    });
    it("能够复制日期", () => {
      const a = new Date();
      a.xxx = { yyy: { zzz: 1 } };
      const a1 = new DeepClone().clone(a);
      assert(a !== a1);
      assert(a.getTime() === a1.getTime());
      assert(a.xxx.yyy.zzz === a1.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a1.xxx.yyy);
      assert(a.xxx !== a1.xxx);
    });
    it("能够跳过原型", () => {
      const a = Object.create({ name: "a" });
      a.xxx = { yyy: { zzz: 1 } };
      const a1 = new DeepClone().clone(a);
      assert(a !== a1);
      assert.isFalse("name" in a1);
      assert(a.xxx.yyy.zzz === a1.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a1.xxx.yyy);
      assert(a.xxx !== a1.xxx);
    });

    it("很复杂的对象", () => {
      const a = {
        n: NaN,
        n2: Infinity,
        s: "",
        bool: false,
        null: null,
        u: undefined,
        sym: Symbol(),
        o: {
          n: NaN,
          n2: Infinity,
          s: "",
          bool: false,
          null: null,
          u: undefined,
          sym: Symbol()
        },
        array: [
          {
            n: NaN,
            n2: Infinity,
            s: "",
            bool: false,
            null: null,
            u: undefined,
            sym: Symbol()
          }
        ]
      };
      const a1 = new DeepClone().clone(a);
      assert(a !== a1);
      assert.isNaN(a1.n);
      assert(a.n2 === a1.n2);
      assert(a.s === a1.s);
      assert(a.bool === a1.bool);
      assert(a.null === a1.null);
      assert(a.u === a1.u);
      assert(a.sym === a1.sym);
      assert(a.o !== a1.o);
      assert.isNaN(a1.o.n);
      assert(a.o.n2 === a1.o.n2);
      assert(a.o.s === a1.o.s);
      assert(a.o.bool === a1.o.bool);
      assert(a.o.null === a1.o.null);
      assert(a.o.u === a1.o.u);
      assert(a.o.sym === a1.o.sym);
      assert(a.array !== a1.array);
      assert(a.array[0] !== a1.array[0]);
      assert.isNaN(a1.array[0].n);
      assert(a.array[0].n2 === a1.array[0].n2);
      assert(a.array[0].s === a1.array[0].s);
      assert(a.array[0].bool === a1.array[0].bool);
      assert(a.array[0].null === a1.array[0].null);
      assert(a.array[0].u === a1.array[0].u);
      assert(a.array[0].sym === a1.array[0].sym);
    });
  });
});
