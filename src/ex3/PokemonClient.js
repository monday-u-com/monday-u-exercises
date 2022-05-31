export default class Pokemon {
  constructor(pokemonName, PokemonId, PokemonType) {
    this.pokemonName = pokemonName;
    this.PokemonId = PokemonId;
    this.PokemonType = PokemonType;
    this.task = this.pokemonToTask();
  }

  pokemonToTask() {
    return `Try to catch ${this.pokemonName} (${this.PokemonType} pokemon) `;
  }
}
