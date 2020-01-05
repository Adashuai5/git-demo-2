class EventHub {
  catch = {}
  on(eventName, fn) {
    this.catch[eventName] = this.catch[eventName] || []
    this.catch[eventName].push(fn)
  }
  emit(eventName) {
    ;(this.catch[eventName] || []).forEach(fn => fn())
  }
}

export default EventHub
