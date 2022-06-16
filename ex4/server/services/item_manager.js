const fs = require('fs').promises;
const pokemon_client = require('../clients/pokemon_client');

const pokemonClient = new pokemon_client();
const todoFile = 'todo_list.json';

async function addTodo(input) {
	const inputString = input?.value;
	let dataArray = await getTodos();
	if (!dataArray) dataArray = [];

	// number / numbers
	if (/^[0-9, ]+$/.test(inputString)) {
		try {
			const ids = inputString.split(',');
			ids.forEach(async (id) => {
				console.log(id);
				const pokemon = await pokemonClient.getPokemon(id);
				return await addPokemonItem(pokemon.name, dataArray);
			});
		} catch (error) {
			return addItem(`Pokemon with ID ${input} was not found`, dataArray);
		}
	}

	// normal todo
	else {
		return addItem(inputString, dataArray);
	}
}

async function addItem(item, dataArray) {
	const todoJson = {
		id: Math.max(...dataArray.map((elem) => elem.id), 0) + 1,
		todo: item,
	};
	dataArray.push(todoJson);
	await writeTodoFile(dataArray);
	return todoJson;
}

async function addPokemonItem(item, dataArray) {
	return await addItem(`catch ${item}`, dataArray);
}

async function getTodos() {
	return await readTodoFile();
}

async function deleteTodo(input) {
	const dataArray = await getTodos();
	const todoIndex = dataArray.findIndex((elem) => elem.id === input);
	const deletedTodo = dataArray[todoIndex];
	dataArray.splice(todoIndex, 1);
	await writeTodoFile(dataArray);
	return deletedTodo;
}

async function readTodoFile() {
	try {
		const dataArray = await fs.readFile(todoFile);
		return JSON.parse(dataArray.toString());
	} catch (error) {
		console.error(`Got an error trying to read the file: ${error.message}`);
	}
}

async function writeTodoFile(content) {
	try {
		await fs.writeFile(todoFile, JSON.stringify(content));
	} catch (error) {
		console.error(`Failed to write to file ${error.message}`);
	}
}

async function checkIfExsitInList(dataArray, taskTobeAdded) {
	let flag = false;
	Object.values(dataArray).forEach((task) => {
		if (task.todo === taskTobeAdded.todo) flag = true;
	});
	return flag;
}

module.exports = {
	addTodo,
	getTodos,
	deleteTodo,
};
