const itemService = require("../services/itemService");

async function createTodo(req, res) {
    await itemService.addTodo(req.body.value)
    res.status(200).json(req.body);
}

async function getAll(req, res) {
    let data = await itemService.getAll();
    if (!data) data = [];
    res.status(200).json(data);
}

async function deleteTodo(req, res) {
    const data = await itemService.deleteTodo(req.params.value)
    res.status(200).json(data);
}

async function deleteAll(req, res) {
    await itemService.deleteAll()
    res.status(200).json(req.body);
}

module.exports = {
    createTodo,
    getAll,
    deleteTodo,
    deleteAll
}