import PokemonClient from "./PokemonClient.js";

class ItemManager {
	constructor() {
		this.id = 0;
		this.itemArray = [];
		this.pokemonClient = new PokemonClient();
	}
	addListItem(item) {
		const { id, value } = this.createId(item);
		this.itemArray = [...this.itemArray, { id, value }];
		return this.itemArray;
	}
	removeItem(itemId) {
		this.itemArray = [
			...this.itemArray.filter((item) => item.id !== parseInt(itemId)),
		];

		return this.itemArray;
	}

	async pokemonIdsHendeling(pokeID) {
		const pokemon = await this.pokemonClient.getPokemon(pokeID);
		return pokemon;
	}

	createId(item) {
		const newItemObj = { id: this.id, value: item };
		this.id++;
		return newItemObj;
	}

	async pokemonIdsTostring(pokemonIdsStr) {
		const pokemonIdsArray = pokemonIdsStr.split(",");
		const pokemonPromises = [];

		pokemonIdsArray.forEach((pokemonIdStr) => {
			pokemonPromises.push(this.pokemonIdsHendeling(pokemonIdStr.trim()));
		});
		const pokemonsRsult = await Promise.all(pokemonPromises);
		pokemonsRsult.forEach((pokemon) => {
			this.addListItem(pokemon);
		});

		return this.itemArray;
	}

	clearItemsArray() {
		this.itemArray = [];
		return this.itemArray;
	}
}
export default ItemManager;
