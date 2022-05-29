export class PokemonClient {
  constructor() {
    this.api = "https://pokeapi.co/api/v2/pokemon/"
  }

  async getPokemon(name) {
    const response = await fetch(`${this.api}${name}`)
    const json = await response.json()
    return json
  }
}
