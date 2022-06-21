import FileSystemManager from "./file-system-manager.js";
import PokemonClient from "../clients/pokemon-client.js";
import { generateUniqueID, capitalizeText } from "../../utils/string-utils.js";

export default class ItemManager {
    constructor() {
        this.pokemonClient = new PokemonClient;
        this.fileSystemManager = new FileSystemManager;
    }

    async addItem(value) {
        const items = value
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);
        return Promise.all(items.map(item => this._handleItem(item)));
    }

    editItem(id, item) {
        const newItem = this.fileSystemManager.editItem(id, item);
        return newItem;
    }

    getItem(item) {
        return this.fileSystemManager.getItemFromFileById(item);
    }

    getAllItems(sortOrder) {
        return this._sortData(sortOrder);
    }

    getItemsLength() {
        return this.fileSystemManager.getAllItems()?.length;
    }

    removeItem(id) {
        if (id) {
            return this.fileSystemManager.removeItemFromFile(id);
        }
        return this.fileSystemManager.cleanTodoFile();
    }

    async _handleItem(item) {
        const res = { item };
        const pokemonExist = this._isPokemonExist(item);
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
        this._handleTodoMessage(res);
        const newItem = this._insertItem(res);

        return newItem;
    }

    _insertItem({ item, pokemon, type, message }) {
        return this.fileSystemManager.addItemToFile({
            id: generateUniqueID(),
            type,
            item,
            pokemon,
            message
        });
    }

    _handleTodoMessage(todo) {
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
                todo.message = `Catch #${pokemon.id} ${capitalizeText(pokemon.name)} the ${pokemon.types.map(p => capitalizeText(p.type.name)).join('/')} type pokemon`;
                break;
            }
        }
    }

    _isPokemonExist(pokemon) {
        const itemsListData = this.fileSystemManager.getAllItems();
        return itemsListData?.find(data => (data.pokemon?.id == pokemon || data.pokemon?.name == pokemon.toLowerCase()));
    }

    _sortData(sortOrder) {
        const itemsListData = this.fileSystemManager.getAllItems();
        itemsListData?.sort((a, b) => a.message > b.message ? 1 : a.message < b.message ? -1 : 0);
        if (sortOrder === 'Z-A') {
            itemsListData?.reverse();
        }
        return itemsListData;
    }

}