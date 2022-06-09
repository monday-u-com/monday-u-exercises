import fetch from "node-fetch";

export default class PokemonClient {
  constructor() {
    this.url = `https://pokeapi.co/api/v2/pokemon`;
  }

  async fetchPokemon(pokemonId) {
    const res = await fetch(this.url + "/" + pokemonId);
    if (!res.ok) {
      // Return status Err
      console.error("Ops! No Pokemon match this ID", { status: res.status });
      throw Error(`Ops! No Pokemon match this ID ${pokemonId}`);
    }
    return await res.json();
  }
}
