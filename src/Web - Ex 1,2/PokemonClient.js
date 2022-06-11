export class PokemonClient {
	constructor() {
		this.API_BASE = 'https://pokeapi.co/api/v2';
	}

	async getPokemon(pokemonId) {
		try {
			const response = await fetch(
				`${this.API_BASE}/pokemon/${pokemonId}`
			);
			const result = await response.json();
			return result.name;
		} catch (error) {
			const errorMessage = `Pokemon with ID ${pokemonId} was not found`;
			return errorMessage;
		}
	}
}
