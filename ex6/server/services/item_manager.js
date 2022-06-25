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
			const pokemon = await this.fetchAndAddPokemon(item);
			return pokemon;
		}
		if (this._isList(item)) {
			return await this.fetchAndAddManyPokemon(item);
		}

		await this.addItem(item);
	};

	addItem = async (item) => {
		const user = await Items.findOne({
			where: { ItemName: item },
		});
		if (!user) {
			await Items.create({
				id: uuidv4(),
				item_id: uuidv4(),
				ItemName: item,
				status: false,
			});
		} else return;
	};

	addPokemonItem = async (pokemon) => {
		await this.addItem(`Catch ${pokemon.name}`);
	};

	fetchPokemon = async (pokemonId) => {
		const pokemon = await this.pokemonClient.getPokemon(pokemonId);
		return pokemon;
	};
	fetchAndAddPokemon = async (pokemonId) => {
		try {
			const pokemon = await this.pokemonClient.getPokemon(pokemonId);
			await this.addPokemonItem(pokemon);
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

	checkChange = async () => {
		const span = (document.getElementsByClassName = 'task-content');
		span.addEvent;
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
		return currItem.update({
			status: !currItem.status,
			taskDoneAt: new Date(),
		});
	};

	editItem = async (item, newContent) => {
		let newVal;
		if (this._isNumber(newContent)) {
			const pokemon = await this.fetchPokemon(newContent);
			newVal = `Catch ${pokemon.name}`;
		} else newVal = newContent;

		let currItem = await Items.findOne({
			where: {
				ItemName: item,
			},
		});

		return currItem.update({ ItemName: newVal });
	};

	_isNumber = (value) => !isNaN(Number(value));
	_isList = (value) => value.split(',').every(this._isNumber);
}

module.exports = new ItemManager();
