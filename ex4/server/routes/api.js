const ItemManager = require('../services/item_manager');

async function getTodos(req, res) {
	let data = await ItemManager.getTodos();
	if (!data) data = [];

	res.header('Access-Control-Allow-Origin', '*');
	res.status(200).json(data);
}

async function createTodo(req, res) {
	const data = await ItemManager.addTodo(req.body);

	res.header('Access-Control-Allow-Origin', '*');
	res.status(200).json(data);
}

async function deleteTodo(req, res) {
	let todoId = Number.parseInt(req.params.id);
	if (isNaN(todoId))
		try {
			let error = Error('Wrong parameters');
			error.statusCode = 400;
			throw error;
		} catch (e) {
			next(e);
		}

	const data = await ItemManager.deleteTodo(todoId);

	res.header('Access-Control-Allow-Origin', '*');
	res.status(200).json(data);
}

module.exports = {
	createTodo,
	deleteTodo,
	getTodos,
};
