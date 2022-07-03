// Define your endpoints here (this is your "controller file")
const express = require('express');
const {
    createTodo,
    getAll,
    deleteTodo,
    deleteAll
} = require("../controllers/todoController");

const todoRouter = express.Router();

todoRouter.get('/', getAll);
todoRouter.post('/', createTodo);
todoRouter.delete('/:value', deleteTodo)
todoRouter.delete('/', deleteAll)

module.exports = todoRouter;