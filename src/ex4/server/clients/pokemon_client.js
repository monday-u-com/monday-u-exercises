// The Pokemon Client (using axios) goes here
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const envFile = process.env;
class PokemonClient {
	constructor() {}
	async getPokemon(pokeID) {
		try {
			const pokemonObj = await (
				await axios.get(`${envFile.pokemonApi}${pokeID}`)
			).data;
			// const pokemonObj = await res.data;
			return `catch ${pokemonObj.name}`;
		} catch (err) {
			console.error(err);
			return `Invalid pokemon id ${pokeID}`;
		}
	}
}
export default PokemonClient;
