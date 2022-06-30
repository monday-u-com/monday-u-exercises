const PokemonClient = require("../clients/pokemon-client");
const { generateUniqueID, capitalizeText } = require("../../utils/string-utils");
const { Item } = require("../db/models");
const Op = require('Sequelize').Op;

class ItemManager {
    constructor() {
        this.pokemonClient = new PokemonClient;
        this.itemsAmount = 0;
    }

    async addItem(value) {
        const items = value
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);
        return Promise.all(items.map(item => this._handleItem(item)));
    }

    async editItem(id, item) {
        const updateObject = {
            name: item.item,
            status: item.checked,
            done_timestamp: item.done_timestamp ? item.done_timestamp : null
        }

        if (item.type == 'text') {
            this._handleTodoMessage(item)
            updateObject.message = item.message
        }

        await Item.update(updateObject, {
            where: { id: id }
        })

        const updateItem = await this.getItem(id);
        return updateItem.dataValues;
    }

    getItem(item) {
        return Item.findByPk(item);
    }

    async getAllItems(sortOrder) {
        const items = await Item.findAll({
            order: [
                ['message', sortOrder? sortOrder: 'ASC']
            ]
        });
        return items.map(item => this._prepareItem(item.dataValues));
    }

    async getPendingTodos() {
        const count = await Item.count(
            { where: { status: false } }
        );
        return { count };
    }

    async removeItem(id) {
        if (id) {
            return await Item.destroy({ where: { id: id }, });
        }
        return await Item.destroy({ where: {}, truncate: true });
    }

    async _handleItem(item) {
        const res = { item };
        const isExist = await this._isTodoExist(item)
        if (isExist) {
            return isExist;
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
        const newItem = await this._insertItem(res);
        return newItem;
    }

    async _insertItem({ item, pokemon, type, message }) {
        const id = generateUniqueID();
        const updateObject = {
            'name': item,
            'type': type,
            'message': message,
            'status': false,
            'done_timestamp': null
        }
        if (pokemon) {
            updateObject.pokemon_id = pokemon.id.toString()
            updateObject.pokemon_name = pokemon.name
            updateObject.pokemon_type = pokemon.types.map(p => capitalizeText(p.type.name))
            updateObject.pokemon_image = pokemon.sprites.front_default
        }
        await Item.create(updateObject);

        return {
            id,
            type,
            item,
            pokemon,
            message
        };
    }

    _handleTodoMessage(todo, type) {
        switch (type || todo.type) {
            case 'notFoundPokemons': {
                todo.message = `Failed to fetch pokemon with this input: ${todo.item}`;
                break;
            }
            case 'pokemonNotFound': {
                todo.message = `Pokemon with ID ${todo.item} was not found`;
                break;
            }
            case 'pokemon': {
                const { pokemon } = todo;
                todo.message = `Catch #${pokemon.id} ${capitalizeText(pokemon.name)} the ${pokemon.types.map(p => capitalizeText(p.type.name)).join('/')} type pokemon`;
                break;
            }
            case 'text': {
                todo.message = todo.item;
                break;
            }
        }
    }

    async _isTodoExist(item) {
        const itemFound = (await Item.findOne({
            where:
            {
                [Op.or]:
                    [{ name: { [Op.eq]: item } },
                    { pokemon_id: { [Op.eq]: item } },
                    { pokemon_name: { [Op.eq]: item } }]
            }
        }))
            ?.dataValues;
        let res = {};
        if (itemFound) {
            if (itemFound.type == 'pokemon') {
                res.type = 'pokemonExists';
                res.pokemon = {
                    id: itemFound.pokemon_id,
                    name: itemFound.pokemon_name,
                    type: itemFound.pokemon_type,
                    image: itemFound.pokemon_image
                };
            }
            else if (itemFound.type == 'text') {
                res.type = 'todoExists';
                res.item = item;
            }
        }
        return Object.keys(res).length ? res : null;
    }

    async _isPokemonExist(pokemon) {
        return !isNaN(pokemon) ?
            (await Item.findOne({ where: { [Op.or]: [{ pokemon_id: { [Op.eq]: pokemon } }, { pokemon_name: { [Op.eq]: pokemon } }] } })) :
            false;
    }

    _prepareItem(item) {
        let pokemon = {};
        if (item.type == 'pokemon') {
            pokemon = {
                id: item.pokemon_id,
                name: item.pokemon_name,
                type: item.pokemon_type,
                image: item.pokemon_image,
                done_timestamp: item.done_timestamp
            }
        }
        return {
            id: item.id,
            item: item.name,
            type: item.type,
            checked: item.status,
            message: item.message,
            pokemon: pokemon
        }
    }

}

module.exports = new ItemManager();
