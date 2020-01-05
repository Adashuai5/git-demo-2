import EventHub from '../src/index'

let test1 = (message) => {
  const eventHub = new EventHub()
  console.assert(eventHub instanceof Object === true, 'eventHub 是对象')
  console.log(message)
}

let test2 = (message) => {
  const eventHub = new EventHub()
  let called = false
  eventHub.on('xxx', y => {
    called = true
    console.assert(y === '我真帅！')
  })
  eventHub.emit('xxx', '我真帅！')
  setTimeout(() => {
    console.log(message)
    console.assert(called === true)
  }, 1000)
}

let test3 = (message) => {
  const eventHub = new EventHub()
  let called = false
  const fn1 = () => {
    called = true
  }
  eventHub.on('xxx', fn1)
  eventHub.off('xxx', fn1)
  eventHub.emit('xxx')
  setTimeout(() => {
    console.log(message)
    console.assert(called === false)
  }, 1000)
}

test1('EventHub 可以创建对象')
test2('.on 之后，.emit 会触发 .on 的函数')
test3('.off 有用')
