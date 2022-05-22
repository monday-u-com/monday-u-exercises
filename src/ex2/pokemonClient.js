class PokemonClient {
  constructor() {
    this.endPoint = "https://pokeapi.co/api/v2/pokemon/";
  }

  async getPokemon(pokemonIds) {
    const errorPokemonIds = [];
    const todos = [];
    try {
      const promises = pokemonIds.map((pokemonId) =>
        axios.get(`${this.endPoint}${pokemonId}`)
      );
      const results = await Promise.allSettled(promises);
      for (let res of results) {
        if (res.status === "rejected") {
          const pokeIdInd = res.reason.request.responseURL.lastIndexOf("/") + 1;
          errorPokemonIds.push(res.reason.request.responseURL.slice(pokeIdInd));
        } else {
            todos.push(`Catch ${res.value.data.name}`);
        }
      }
      if (errorPokemonIds.length === 1) {
        todos.push(`Pokemon with ID ${errorPokemonIds[0]} was not found`);
      } else if (errorPokemonIds.length > 1) {
        todos.push(
          `Failed tp fetch the pokemons with these ids: ${errorPokemonIds.join(
            ", "
          )}`
        );
      }
      return todos;
    } catch (err) {
      console.error(`An error occured: ${err}`);
    }
  }
}
