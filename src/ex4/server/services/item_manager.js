// The ItemManager should go here. Remember that you have to export it.
const PokemonClient = require("../clients/pokemon_client.js");
const { item, sequelize } = require("../db/models");
class ItemManager {
	constructor() {
		this.pokemonClient = new PokemonClient();
	}
	getAllItems = async () => {
		return await item.findAll();
	};

	async setItem(itemToAdd) {
		try {
			await item.create(itemToAdd);
			return "created!";
		} catch (err) {
			console.error(err);
			return err;
		}
	}

	async updateItem(itemToUpdate, itemId) {
		return item.update(itemToUpdate, { where: { id: itemId } });
	}

	async removeItem(itemId) {
		await item.destroy({
			where: { id: itemId },
		});
		return this.getAllItems();
	}

	async pokemonIdsHandle(pokeID) {
		const pokemon = await this.pokemonClient.getPokemon(pokeID);
		return pokemon;
	}

	async pokemonFatch(pokemonIdsArray) {
		const pokemonPromises = [];

		pokemonIdsArray.forEach((pokemonIdStr) => {
			pokemonPromises.push(this.pokemonIdsHandle(pokemonIdStr.trim()));
		});
		const pokemonsRsult = await Promise.all(pokemonPromises);
		for (let i = 0; pokemonsRsult.length > i; i++) {
			const currentPokedexIdAsInt = parseInt(pokemonIdsArray[i]);
			const itemObg = this.createjsonToDB({
				itemName: pokemonsRsult[i],
				pokedexId: currentPokedexIdAsInt,
			});
			await this.setItem(itemObg);
		}
		return "created!";
	}

	async clearAllItems() {
		try {
			return await item.destroy({ where: {} });
		} catch (err) {
			return err;
		}
	}

	isPokemonItem(input) {
		const patternForNumbers = /^\d+$/;
		return (
			patternForNumbers.test(input.itemName) || input.itemName.includes(",")
		);
	}

	async isPokemonExist(input) {
		const inputAsInt = parseInt(input);
		const isPokemonExist = await item.findAll({
			where: { pokedexId: inputAsInt },
		});
		return isPokemonExist.length > 0;
	}

	async isItemExist(input) {
		const isItemExist = await item.findAll({
			where: { itemName: input.itemName },
		});
		return isItemExist.length === 0;
	}

	async validateInput(input) {
		if (this.isPokemonItem(input)) {
			const inputToArray = input.itemName.split(",") || [input.itemName];
			const itemsToFetch = [];
			for (let i = 0; inputToArray.length > i; i++) {
				if (!(await this.isPokemonExist(inputToArray[i]))) {
					itemsToFetch.push(inputToArray[i]);
				}
			}
			return itemsToFetch;
		} else {
			if (await this.isItemExist(input)) {
				return input;
			}
		}
	}

	async handleInput(input) {
		if (Array.isArray(input)) {
			try {
				return await this.pokemonFatch(input);
			} catch (err) {
				return err;
			}
		} else {
			const itemObg = this.createjsonToDB(input);
			return await this.setItem(itemObg);
		}
	}

	createjsonToDB(semiItem) {
		return {
			itemName: semiItem.itemName,
			status: semiItem.status || false,
			pokedexId: semiItem.pokedexId || null,
		};
	}
}

module.exports = ItemManager;
