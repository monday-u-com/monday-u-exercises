// The ItemManager should go here. Remember that you have to export it.
const pokemonClient = require('../clients/pokemon_client')
const { Item } = require('../db/models')
const file = require('../db/file');

async function getAll() {
    return await Item.findAll();
}

async function addTodo(itemValue) {
    if (isNumber(itemValue)) {
        await fetchAndAddPokemon(itemValue);
    } else if (isList(itemValue)) {
        await fetchAndAddManyPokemon(itemValue);
    } else {
        await file.addTodo(itemValue);
    }
};

async function deleteTodo(value) {
    let todos = await getAll();
    const index = todos.findIndex((todo) => todo.value === value);
    const deletedTodo = todos[index]
    todos.splice(index, 1);
    await file.writeTodoFile(todos);
    return deletedTodo
}

async function deleteAll() {
    let emptyArr = [];
    await file.writeTodoFile(emptyArr);
}

async function fetchAndAddPokemon(itemValue) {
    try {
        const { name } = await pokemonClient.getPokemon(itemValue);
        await file.addTodo(name);
    } catch (error) {
        await file.addTodo(`Pokemon with ID ${itemValue} was not found`);
    }
};

async function fetchAndAddManyPokemon(itemValue) {
    try {
        const pokemons = await pokemonClient.getManyPokemon(
            itemValue.replaceAll(" ", "").split(",")
        );
        const pokemosName = pokemons.map((p) => p.name);
        await file.addManyTodo(pokemosName);
    } catch (error) {
        await file.addTodo(`Failed to fetch pokemon with this input: ${itemValue}`);
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
    deleteAll
};