import EventHub from '../src/index'

const eventHub = new EventHub()

console.assert(eventHub instanceof Object === true, 'eventHub 是对象')

let called = false

eventHub.on('xxx', () => {
  called = true
  console.log('called：' + called)
})

eventHub.emit('xxx')
