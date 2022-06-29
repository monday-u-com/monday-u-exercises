// The Pokemon Client (using axios) goes here
const dotenv = require("dotenv");
const axios = require("axios");
const pokemonApi = require("../../envModule.js").pokemonApi;
class PokemonClient {
	constructor() {}
	async getPokemon(pokeID) {
		try {
			const pokemonObj = await await axios.get(`${pokemonApi}${pokeID}`);
			// const pokemonObj = await res.data;
			return `catch ${pokemonObj.data.name}`;
		} catch (err) {
			console.error(err);
			return `Invalid pokemon id ${pokeID}`;
		}
	}
}
module.exports = PokemonClient;
