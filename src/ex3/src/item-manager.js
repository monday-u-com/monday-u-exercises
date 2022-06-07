import FileSystemManager from "./file-system-manager.js";
import PokemonClient from "./pokemon-client.js";
import chalk from 'chalk';

class ItemManager {
    constructor() {
        this.pokemonClient = new PokemonClient;
        this.fileSystemManager = new FileSystemManager;
    }

    async addItem(value) {
        const items = value
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);
        return Promise.all(items.map(item => this.handleItem(item)));
    }

    async handleItem(item) {
        const res = { item };
        const pokemonExist = this.isPokemonExist(item);
        if (pokemonExist) {
            res.type = 'pokemonExists';
            res.pokemon = pokemonExist.pokemon;
            return res;
        }
        const pokemon = await this.pokemonClient.getPokemon(item.toLowerCase());
        if (pokemon.success) {
            res.type = 'pokemon';
            res.pokemon = pokemon.body;
        }
        else if (pokemon.error && !isNaN(item) && !item.toString().includes('.')) {
            res.type = 'pokemonNotFound';
        } else {
            res.type = 'text';
        }
        return this.handleTodoMessage(res);
    }

    handleTodoMessage(todo) {
        switch (todo.type) {
            case 'notFoundPokemons': {
                todo.message = `Failed to fetch pokemon with this input: ${todo.item}`;
                break;
            }
            case 'pokemonNotFound': {
                todo.message = `Pokemon with ID ${todo.item} was not found`;
                break;
            }
            case 'text': {
                todo.message = todo.item;
                break;
            }
            case 'pokemon': {
                const { pokemon } = todo;
                todo.message = `Catch #${pokemon.id} ${this.capitalizeText(pokemon.name)} the ${pokemon.types.map(p => this.capitalizeText(p.type.name)).join('/')} type pokemon`;
                break;
            }
        }
        return todo;
    }

    insertItem({ item, pokemon, type, message }) {
        this.fileSystemManager.addItemToFile({
            type,
            item,
            pokemon,
            message
        });
    }

    isPokemonExist(pokemon) {
        const itemsListData = this.fileSystemManager.getAllItems();
        return itemsListData?.find(data => (data.pokemon?.id == pokemon || data.pokemon?.name == pokemon.toLowerCase()));
    }

    getItemsLength() {
        return this.fileSystemManager.getAllItems()?.length;
    }

    capitalizeText(text) {
        return text
            .split(' ')
            .map((s) => s[0].toUpperCase() + s.slice(1))
            .join(' ');
    }
}

export default ItemManager;