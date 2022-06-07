import { popularPokemons } from "./popular-pokemons.js";

export class PokemonClient {
  constructor() {
    this.API_BASE = 'https://pokeapi.co/api/v2/pokemon';
  }

  async fetchPokemon(pokemonText) {
    try {
      const pokemons = pokemonText.split(',').map( el => el.trim() );
      let promises = [];
      pokemons.forEach(pokemon => {
        promises.push(fetch(`${this.API_BASE}/${pokemon}/`));
      });
      const responses = await Promise.all(promises);
      const elements = await Promise.all(responses.map(response => response.json()));
      return elements.map(element =>
        `${element.forms[0].name} (${element.types[0].type.name} pokemon)`);
    } catch (error) {
      this.handleFailure(pokemonText);
    }
  }

  handleFailure(pokemon) {
    console.log(`Failed to fetch ${pokemon}`);
  }

  isPokemon(name) {
    return popularPokemons.find(pokemon => pokemon.toLowerCase() === name.trim().toLowerCase());
  }
}
