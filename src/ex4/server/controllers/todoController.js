import {  
    addTodoService,
    getAllService,
    deleteTodoService,
    deleteAllTodoService
} from "../services/service.js";

export async function createTodo(req, res) {
    const data=await addTodoService(req.body);
    res.status(200).json(data);
}

export async function deleteAllTodo(req, res) {
    const data=await deleteAllTodoService();
    res.status(200).json(data);
}

export async function getAll(req, res) {
    let data = await getAllService();
    if (!data) data = [];
    res.status(200).json(data);
}

export async function deleteTodo(req, res) {
    let todoId = Number.parseInt(req.params.id);
    if (isNaN(todoId)) {
        let error = Error();
        error.statusCode = 400
        error.message = 'Wrong parameters'
        throw error
    }
    const data = await deleteTodoService(todoId);
    res.status(200).json(data);
}

