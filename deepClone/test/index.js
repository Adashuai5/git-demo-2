const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const assert = chai.assert
const deepClone = require('../src/index')

describe('deepClone', () => {
  it('是一个函数', () => {
    assert.isFunction(deepClone)
  })
  it('能够复制基本类型', () => {
    const n = 123
    const n1 = deepClone(n)
    assert.equal(n, n1)
    const s = '123'
    const s1 = deepClone(s)
    assert.equal(n, s1)
    const b = true
    const b1 = deepClone(b)
    assert.equal(b, b1)
    const u = undefined
    const u1 = deepClone(u)
    assert.equal(u, u1)
    const empty = null
    const empty1 = deepClone(empty)
    assert.equal(empty, empty1)
    // Symbol 不细究了
    const symbol = Symbol()
    const symbol1 = deepClone(symbol)
    assert(symbol === symbol1)
  })
  describe('对象', () => {
    it('能够复制对象', () => {
      const a = { name: 'ada', child: { name: 'little ada' } }
      const a1 = deepClone(a)
      assert(a !== a1)
      assert(a.name === a1.name)
      assert(a.child !== a1.child)
      assert(a.child.name === a1.child.name)
    })
    it('能够复制数组', () => {
      const a = [
        [1, 2, 3],
        [2, 3, 4],
        [12, 23, 34]
      ]
      const a1 = deepClone(a)
      assert(a[0] !== a1[0])
      assert(a[1] !== a1[1])
      assert(a[2] !== a1[2])
      assert.deepEqual(a, a1)
    })
    it('能够复制函数', () => {
      const a = function () {
        return 1
      }
      a.xxx = { yyy: { zzz: 1 } }
      const a1 = deepClone(a)
      assert(a !== a1)
      assert(a.xxx.yyy.zzz === a1.xxx.yyy.zzz)
      assert(a.xxx.yyy !== a1.xxx.yyy)
      assert(a.xxx !== a1.xxx)
      assert(a() === a1())
    })
    it('能够复制环', () => {
      const a = { name: 'ada', child: { name: 'little ada' } }
      a.self = a
      const a1 = deepClone(a)
      assert(a !== a1)
      assert(a.name === a1.name)
      assert(a.self !== a1.self)
    })
  })
})
