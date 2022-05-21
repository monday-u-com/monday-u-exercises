class PokemonClient {
  constructor() {
    this.endPoint = "https://pokeapi.co/api/v2/pokemon/";
  }

  async getPokemon(pokemonIds) {
    try {
      const promises = pokemonIds.map((pokemonId) =>
        axios.get(`${this.endPoint}${pokemonId}`)
      );
      const results = await Promise.all(promises);
      return results.map((res) => res.data.name);
    } catch (err) {
      console.error(`An error occured: ${err}`);
      throw err;
    }
  }
}
