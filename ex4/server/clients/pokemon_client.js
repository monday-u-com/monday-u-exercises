const axios = require('axios');

class PokemonClient {
	constructor() {
		this.API_BASE = 'https://pokeapi.co/api/v2/pokemon';
	}

	async getPokemon(pokemonId) {
		try {
			const response = await axios.get(`${this.API_BASE}/${pokemonId}`);

			return response.data;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = PokemonClient;
