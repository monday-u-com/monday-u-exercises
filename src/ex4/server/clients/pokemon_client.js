// The Pokemon Client (using axios) goes here
const axios = require('axios');

module.exports = class PokemonClient {
  constructor() {
    this.API_URL = 'https://pokeapi.co/api/v2/pokemon/';
  }

  async fetchPokemons(ids) {
    try {
      const allResponses = await Promise.all(
        ids.map((id) => this.fetchSinglePokemon(id))
      );

      return allResponses;
    } catch (err) {
      console.log(err);
      throw new Error('Failed to fetch pokemons');
    }
  }

  async fetchSinglePokemon(id) {
    try {
      const singleResponse = await axios.get(`${this.API_URL}${id}/`);
      const data = singleResponse.data;
      return { id: data.id, task: `Catch ${data.name}` };
    } catch (err) {
      console.log(err.message);
      if (isNaN(id)) {
        return id;
      } else {
        return `Could not fetch pokemon with id ${id}`;
      }
    }
  }
};
