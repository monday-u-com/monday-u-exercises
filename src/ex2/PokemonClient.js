class PokemonClient {
  constructor() {}

  async fetchPokemon(pokemonId) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return `${pokemonId} Not found`;
    }
  }
}

export const pokemonClient = new PokemonClient();
