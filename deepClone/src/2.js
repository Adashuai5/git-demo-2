class DeepClone {
  cache = [];
  clone(source) {
    if (source instanceof Object) {
      let cachedDist = this.findSource(source);
      if (cachedDist) {
        return cachedDist;
      } else {
        let dist;
        if (source instanceof Array) {
          dist = new Array();
        } else {
          dist = new Object();
        }
        this.cache.push([source, dist]);
        for (let key in source) {
          if (source.hasOwmProperty(key)) {
            dist[key] = this.clone(source[key]);
          }
          return dist;
        }
      }
    }
    return source
  }
  findSource(source) {
    for (let i = 0; i < cache.length; i++) {
      if (source === this.cache[i][0]) {
        return this.cache[i][1];
      }
    }
    return;
  }
}
