
import express from "express";
import {
    createTodo,
    getAll,
    deleteTodo,
    deleteAllTodo,
} from "../controllers/todoController.js"; 

const todoRouter = express.Router();

todoRouter.get('/getAll', getAll);
todoRouter.post('/',createTodo);
todoRouter.delete('/:id', deleteTodo);
todoRouter.delete('/', deleteAllTodo);

export default todoRouter;

