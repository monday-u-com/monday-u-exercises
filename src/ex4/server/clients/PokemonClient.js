const axios = require("axios")
class PokemonClient {
  constructor() {
    this.api = "https://pokeapi.co/api/v2/pokemon/"
  }

  async getPokemon(id) {
    console.log(`${this.api}${id}`)
    const response = await axios.get(`${this.api}${id}`)
    return response.data
  }
}

module.exports = PokemonClient
