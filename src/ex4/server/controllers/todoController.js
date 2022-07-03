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
    const data = await itemService.deleteTodo(req.params.id)
    res.status(200).json(data);
}

async function deleteAll(req, res) {
    await itemService.deleteAll()
    res.status(200).json(req.body);
}

async function updateTodoStatus(req, res) {
    const data = await itemService.updateStatus(req.params.id, req.body.status)
    res.status(200).json(data);
}

module.exports = {
    createTodo,
    getAll,
    deleteTodo,
    deleteAll,
    updateTodoStatus
}