export class PokemonClient {
  constructor() {
    this.API_BASE = 'https://pokeapi.co/api/v2/pokemon';
  }

  failureHandler(id) {
    console.log(`Failed to find ${id}.`);
  }

  async catchPokemon(id) {
      try {
        const response = await fetch (`${this.API_BASE}/${id}/`);
        const data = await response.json();
        return data.forms[0].name;
      } catch (error) {
        this.failureHandler(id);
      }
  }
}
