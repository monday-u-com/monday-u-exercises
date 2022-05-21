class PokemonClient {
  constructor() {}

  async fetchPokemon(pokemonId) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    const data = await response.json();

    return data.name;
  }
}

export const pokemonClient = new PokemonClient();
