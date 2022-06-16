const express = require('express');
const { createTodo, getTodos, deleteTodo } = require('./api');
const { validateSchema, todoSchema } = require('../middleware/validation');

const todoRouter = express.Router();

todoRouter.get('/', getTodos);
todoRouter.post('/', validateSchema(todoSchema), createTodo);
todoRouter.delete('/:id', deleteTodo);

module.exports = todoRouter;
