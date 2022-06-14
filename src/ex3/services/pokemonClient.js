import fetch from "node-fetch";
class PokemonClient {
  async fetchPokemon(pokemonId) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    const errorResponse = {
      error: true,
      data: pokemonId,
      description: `Pokemon with ID ${pokemonId} was not found`,
    };
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return errorResponse;
      }
      const json = await response.json();
      if (json.name) {
        return {
          error: false,
          data: json,
          description: `Pokemon with ID ${pokemonId} data`,
        };
      }
      return errorResponse;
    } catch (error) {
      console.log("this is error");
      return errorResponse;
    }
  }

  fetchMultiplePokemons(pokemonsToFetch) {
    const promises = [];
    for (let pokemon of pokemonsToFetch) {
      let promise = this.fetchPokemon(pokemon);
      promises.push(promise);
    }
    return promises;
  }
}

export default PokemonClient;
