class PokemonClient {
  constructor() {
    this.endPoint = "https://pokeapi.co/api/v2/pokemon/";
  }

  async getPokemon(pokemonIds) {
      console.log(pokemonIds)
    const promises = pokemonIds.map((pokemonId) =>
      axios.get(`${this.endPoint}${pokemonId}`)
    );
    const results = await Promise.all(promises);
    console.log(results);
    return results.map((res) => res.data.name);
  }
}
