class PokemonClient {
  constructor(name, level) {
    this.name = name
    this.level = level
  }
  getName() {
    return this.name
  }
  getLevel() {
    return this.level
  }
  setLevel(level) {
    this.level = level
  }
}
