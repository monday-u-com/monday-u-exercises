import fetch from 'node-fetch';
class PokemonClient {
	constructor() {
		this.API_BASE = 'https://pokeapi.co/api/v2';
	}

	async getPokemon(pokemonId) {
		try {
			const response = await fetch(
				`${this.API_BASE}/pokemon/${pokemonId}`
			);
			const result = await response.json();
			let pokemomImage =
				result.sprites.other['official-artwork'].front_default;
			let pokemonName = result.name;

			return { pokemonName, pokemomImage };
		} catch (error) {
			const errorMessage = `Pokemon with ID ${pokemonId} was not found`;
			return errorMessage;
		}
	}

	async getAllPokemons(pokemonsIds) {
		const allPromises = [];
		let pokemons = [];
		try {
			pokemonsIds.forEach((pokemonId) => {
				allPromises.push(
					fetch(`${this.API_BASE}/pokemon/${pokemonId}`)
				);
			});

			await Promise.all(allPromises).then((responses) => {
				responses.some((response) => {
					if (!response.ok) {
						const errorMessage = `Failed to fetch pokemon with this input ${pokemonsIds}`;
						pokemons = errorMessage;
						return pokemons;
					}
					const result = response.json();
					result.then((pokemon) => {
						pokemons.push(pokemon.name);
					});
				});
			});
			return pokemons;
		} catch (error) {
			const errorMessage = `Failed to fetch pokemon with this input ${pokemonsIds}`;
			return errorMessage;
		}
	}
}
export default PokemonClient;
