export class PokemonClient {
  constructor() {
    this.API_BASE = 'https://pokeapi.co/api/v2/pokemon';
  }

  failureHandler(ids) {
    console.log(`Failed to fetch ${ids}`);
  }

  async catchPokemon(ids) {
    try {
      const idsArray = ids.split(',').map( el => el.trim() );
      let allPromises = [];
      idsArray.forEach(id => {
        allPromises.push(fetch(`${this.API_BASE}/${id}/`));
      });
      const allPokemons = await Promise.all(allPromises);
      const data = await Promise.all(allPokemons.map(response => response.json()));
      return await Promise.all(data.map(el => `${el.forms[0].name} (${el.types[0].type.name} pokemon)`));
    } catch (error) {
      this.failureHandler(ids);
    }
  }
}
