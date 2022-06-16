import fetch from "node-fetch";
import { popularPokemons } from "./popular-pokemons.js";

export class PokemonClient {
  constructor() {
    this.API_BASE = 'https://pokeapi.co/api/v2/pokemon';
    // popular Pokemons list from https://gist.github.com/octalmage/6936761
  }

  async fetchPokemon(pokemonText) {
    try {
      const pokemons = pokemonText.split(',').map( el => el.trim() );
      const promises = pokemons.map(pokemon => {
        return fetch(`${this.API_BASE}/${pokemon}/`);
      });
      const responses = await Promise.all(promises);
      const elements = await Promise.all(responses.map(response => response.json()));
      return elements.map(element => {
        return {
          name: element.forms[0].name,
          type: element.types[0].type.name,
          id: element.id
        }
      });
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
