// The Pokemon Client (using axios) goes here
const dotenv = require("dotenv");
const axios = require("axios");
const pokemonApi = require("../../envModule.js").pokemonApi;
dotenv.config();
const envFile = process.env;
class PokemonClient {
	constructor() {}
	async getPokemon(pokeID) {
		try {
			const pokemonObj = await (await axios.get(`${pokemonApi}${pokeID}`)).data;
			// const pokemonObj = await res.data;
			return `catch ${pokemonObj.name}`;
		} catch (err) {
			console.error(err);
			return `Invalid pokemon id ${pokeID}`;
		}
	}
}
module.exports = PokemonClient;
