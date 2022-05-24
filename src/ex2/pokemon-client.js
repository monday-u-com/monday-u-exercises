export class PokemonClient {
  constructor() {
    this.API_BASE = 'https://pokeapi.co/api/v2/pokemon';
  }
  failureHandler(idOrName) {
    console.log(`Failed to find ${idOrName}.`);
  }
  async catchPokemon(idOrName) {
      try {
        const response = await fetch (`${this.API_BASE}/${idOrName}/`);
        const data = await response.json();
        return data.forms[0].name;
      } catch (error) {
        this.failureHandler(idOrName);
        throw error;
      }
  }
}
