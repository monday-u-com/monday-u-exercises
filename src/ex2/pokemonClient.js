class PokemonClient {
  constructor() {
    this.endPoint = "https://pokeapi.co/api/v2/pokemon/";
  }

  async getPokemon(pokemonId) {
    const res = await axios.get(`${this.endPoint}${pokemonId}`);
    console.log(res.data.name);
    return res.data.name;
  }
}
