const PokemonClient = require('../clients/pokemon_client');
const { Items } = require('../db/models');
const { v4: uuidv4 } = require('uuid');

class ItemManager {
	constructor() {
		this.pokemonClient = new PokemonClient();
	}

	getItems = async () => await Items.findAll();

	handleItem = async (item) => {
		if (this._isNumber(item)) {
			return await this.fetchAndAddPokemon(item);
		}
		if (this._isList(item)) {
			return await this.fetchAndAddManyPokemon(item);
		}

		this.addItem(item);
	};

	addItem = async (item) => {
		const user = await Items.findOne({
			where: { ItemName: item },
		});
		if (!user) {
			const itemv = Items.create({
				id: uuidv4(),
				item_id: 3,
				ItemName: item,
				status: false,
			});
		} else return;
	};

	addPokemonItem = (pokemon) => {
		this.addItem(`Catch ${pokemon.name}`);
	};

	fetchAndAddPokemon = async (pokemonId) => {
		try {
			const pokemon = await this.pokemonClient.getPokemon(pokemonId);
			this.addPokemonItem(pokemon);
		} catch (error) {
			this.addItem(`Pokemon with ID ${pokemonId} was not found`);
		}
	};

	fetchAndAddManyPokemon = async (inputValue) => {
		try {
			const pokemons = await this.pokemonClient.getManyPokemon(
				inputValue.replace('/ /g', '').split(',')
			);
			pokemons.forEach(this.addPokemonItem);
		} catch (error) {
			console.error(error);
			this.addItem(
				`Failed to fetch pokemon with this input: ${inputValue}`
			);
		}
	};

	deleteItem = async (item) => {
		await Items.destroy({
			where: {
				ItemName: item,
			},
		});
	};

	updateStatus = async (item) => {
		let currItem = await Items.findOne({
			where: {
				ItemName: item,
			},
		});
		return currItem.update({ status: !currItem.status });
	};

	_isNumber = (value) => !isNaN(Number(value));
	_isList = (value) => value.split(',').every(this._isNumber);
}

module.exports = new ItemManager();
