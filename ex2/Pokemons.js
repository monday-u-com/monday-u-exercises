export default class Pokemon {
    constructor(name, id, type) {
      this.name = name;
      this.id = id;
      this.type = type;
      this.task = this.createPokemonTask();
    }
  
    createPokemonTask() {
      return `WHOO! You need to Catch ${this.name} he is a (${this.type} pokemon !) `;
    }
  }