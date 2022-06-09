export default class PokemonClient {
  constructor() {}

  async pokemonFetcherById(pokemon) {
    const pokemons = await Promise.all(
      pokemon.map(async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (response.ok) {
          return await response.json();
        } else {
          return id;
        }
      })
    ).catch((error) => {
      alert(error);
    });
    return pokemons;
  }
}
