import axios from 'axios';
export default class PokemonClient {
	constructor() {
		this.API_BASE = 'https://pokeapi.co/api/v2';
	}

	async getPokemon(pokemonId) {
		try {
			const response = await axios.get(`${this.API_BASE}/pokemon/5`);
			const result = await response.json();
			return result.name;
		} catch (error) {
			const errorMessage = `Pokemon with ID ${pokemonId} was not found`;
			return errorMessage;
		}
	}
}
