export class PokemonClient {
  constructor(name) {
    this.api = "https://pokeapi.co/api/v2/pokemon/"
    this.name = name
  }
  getPokemon() {
    return fetch(this.api + this.name)
      .then((response) => response.json())
      .then((data) => {
        return data
      })
  }
}
