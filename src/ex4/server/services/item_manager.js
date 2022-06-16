// The ItemManager should go here. Remember that you have to export it.
import PokemonClient from "../clients/pokemon_client.js";
import fs from "fs";
import envModule from "../../envModule.js";
const cleanFile = { data: [] };
class ItemManager {
	constructor() {
		this.pokemonClient = new PokemonClient();
	}

	getAllItems() {
		let items = fs.readFileSync(envModule.jsonFilePath);
		return JSON.parse(items);
	}

	async setAllItems(items) {
		try {
			fs.writeFileSync(envModule.jsonFilePath, JSON.stringify(items));
		} catch (err) {
			return err;
		}
	}

	async addListItem(item) {
		const items = this.getAllItems();
		items.data = [...items.data, item];
		await this.setAllItems(items);
		return items;
	}

	removeItem(itemIndex) {
		const items = this.getAllItems();
		items.data = [...items.data.filter((item, i) => i !== parseInt(itemIndex))];
		this.setAllItems(items);
		return items;
	}

	async pokemonIdsHendeling(pokeID) {
		const pokemon = await this.pokemonClient.getPokemon(pokeID);
		return pokemon;
	}

	async pokemonFatching(pokemonIdsStr) {
		const pokemonIdsArray = pokemonIdsStr.split(",");
		const pokemonPromises = [];

		pokemonIdsArray.forEach((pokemonIdStr) => {
			pokemonPromises.push(this.pokemonIdsHendeling(pokemonIdStr.trim()));
		});
		const pokemonsRsult = await Promise.all(pokemonPromises);
		pokemonsRsult.forEach((pokemon) => {
			const newItem = { value: pokemon };
			this.addListItem(newItem);
		});
		return await this.getAllItems();
	}

	clearItemsArray() {
		this.setAllItems(cleanFile);
		return cleanFile;
	}

	async validateInput(input) {
		const patternForNumbers = /^\d+$/;
		if (patternForNumbers.test(input.value) || input.value.includes(",")) {
			try {
				return await this.pokemonFatching(input.value);
			} catch (err) {
				return err;
			}
		} else {
			return this.addListItem(input);
		}
	}
}

export default ItemManager;
