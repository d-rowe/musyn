class Composition {
  constructor() {
    this.hash = '';
  }

  setHash(hash) {
    this.hash = hash;
  }

  getHash() {
    return this.hash;
  }
}

export default new Composition();
