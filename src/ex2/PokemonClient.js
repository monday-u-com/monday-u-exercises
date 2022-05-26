class PokemonClient {
	constructor() {}
	async getPokemon(pokeID) {
		try {
			const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
			const pokemonObj = await res.json();
			return `catch ${pokemonObj.name}`;
		} catch (err) {
			console.error(err);
			return `Invalid pokemon id ${pokeID}`;
		}
	}
}
export default PokemonClient;
