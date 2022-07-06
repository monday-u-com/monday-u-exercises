// Define your endpoints here (this is your "controller file")
const express = require('express');
const {
    createTodo,
    getAll,
    deleteTodo,
    deleteAll,
    updateTodoStatus
} = require("../controllers/todoController");

const todoRouter = express.Router();

todoRouter.get('/', getAll);
todoRouter.post('/', createTodo);
todoRouter.put('/:id', updateTodoStatus);
todoRouter.delete('/:id', deleteTodo)
todoRouter.delete('/', deleteAll)

module.exports = todoRouter;