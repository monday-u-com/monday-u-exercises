var express = require('express');
const {getTodos, addTodo, deleteTodo, clearAll} = require('../services/item_manager');


const todoRouter = express.Router();

todoRouter.get('/', async (req, res) => {
    let data = await getTodos();
    if (!data) data = []
    res.status(200).json(data);
});

todoRouter.post('/', addTodo);

todoRouter.post('/new', async (req, res) => {
    console.log("new list");
    await newList(req.body);
    res.status(200).json(req.body);
});

todoRouter.delete('/', async (req, res) => {
    console.log("delete task");
    const deletedTask = await deleteTodo(req.body.name);
    res.status(200).json(deletedTask);
});

todoRouter.delete('/all', async (req, res) => {
    console.log("clear bord");
    await clearBord();
    res.status(200).json(req.body);
});


todoRouter.put('/', async (req, res) => {
    console.log("urgency changed");
    const changedTask = await changeUrency(req.body.name, req.body.urgency, req.body.color);
    res.status(200).json(changedTask);
});

module.exports = todoRouter;