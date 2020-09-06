class EventHub {
  private cache: { [name: string]: Array<(data: unknown) => void> } = {};
  on(name: string, fn: (data: unknown) => void) {
    this.cache[name] = this.cache[name] || [];
    this.cache[name].push(fn);
  }
  emit(name: string, data: unknown) {
    (this.cache[name] || []).forEach((fn) => {
      fn(data);
    });
  }
  off(name: string, fn: (data: unknown) => void) {
    let index = this.cache[name].indexOf(fn);
    this.cache[name].splice(index, 1);
  }
}

export default EventHub;
