class EventHub {
  catch = {
    // xxx: [f1, f2]
  }
  on(eventName, fn) {
    if (this.catch[eventName] === undefined) {
      this.catch[eventName] = []
    }
    this.catch[eventName].push(fn)
  }
  emit(eventName) {
    let array = this.catch[eventName]
    if (array === undefined) {
      array = []
    }
    array.forEach(fn => {
      fn()
    })
  }
}

export default EventHub
