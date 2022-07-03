// The ItemManager should go here. Remember that you have to export it.
const pokemonClient = require('../clients/pokemon_client')
const { Item } = require('../db/models')

async function getAll() {
    return await Item.findAll();
}

async function addTodo(itemValue) {
    if (isNumber(itemValue)) {
        await fetchAndAddPokemon(itemValue);
    } else if (isList(itemValue)) {
        await fetchAndAddManyPokemon(itemValue);
    } else {
        await Item.create({ itemName: itemValue });
    }
};

async function deleteTodo(id) {
    await Item.destroy({
        where: { id }
    });
}

async function deleteAll() {
    await Item.destroy({
        where: {},
        truncate: true,
        restartIdentity: true
    });
}

async function updateStatus(id, status) {
    await Item.update({ status }, {
        where: { id }
    });
}

async function fetchAndAddPokemon(itemValue) {
    try {
        const { name } = await pokemonClient.getPokemon(itemValue);
        await Item.create({ itemName: `Catch ${name}` });
    } catch (error) {
        await Item.create({ itemName: `Pokemon with ID ${itemValue} was not found` });
    }
};

async function fetchAndAddManyPokemon(itemValue) {
    try {
        const pokemons = await pokemonClient.getManyPokemon(
            itemValue.replaceAll(" ", "").split(","));

        const pokemonItem = pokemons.map((pokemon) => { return { itemName: `Catch ${pokemon.name}` } });
        await Item.bulkCreate(pokemonItem);

    } catch (error) {
        await Item.create({ itemName: `Failed to fetch pokemon with this input: ${itemValue}` });
    }
};

function isNumber(value) {
    return !isNaN(Number(value));
}
function isList(value) {
    return value.split(",").every(isNumber);
}

module.exports = {
    addTodo,
    getAll,
    deleteTodo,
    deleteAll,
    updateStatus
};