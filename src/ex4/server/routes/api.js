// Define your endpoints here (this is your "controller file")
const express = require('express');
// const {
//     addTask,
//     deleteTask,
//     getAll,
// } = require('../services/item_manager')
const itemService = require('../services/item_manager');

const todoRouter = express.Router();

todoRouter.get('/', getAll);
todoRouter.post('/', addTask);
todoRouter.delete('/:id', deleteTask);
todoRouter.delete('/', deleteAllTasks);


async function deleteTask(req, res) {
    let taskId = Number.parseInt(req.params.id);
    const task = await itemService.deleteTask(taskId);
    res.status(200).json(task);
}

async function getAll(req, res) {
    let data = await itemService.getAll();
    if (!data) data = [];
    res.status(200).json(data);
}

async function addTask(req, res) {
    await itemService.addTask(req.body);
    res.status(200).json(req.body);
}

async function deleteAllTasks(req, res) {
    await itemService.deleteAllTasks();
    res.status(200).json({});
}

module.exports = todoRouter;