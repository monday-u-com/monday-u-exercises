import axios from "axios"
export class PokemonClient {
  constructor() {
    this.api = "https://pokeapi.co/api/v2/pokemon/"
  }

  async getPokemon(name) {
    const response = await axios.get(`${this.api}${name}`)
    return response.data
  }
}
