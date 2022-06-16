import express from 'express';

import {
    GetTasks,
    AddTask,
    DeleteTasks,
    DeleteTask,
    CompleteTask,
    SortTasksByName
} from '../controllers/TaskController.js';

const task_router = express.Router();

task_router.get('/', GetTasks);
task_router.post('/', AddTask);
task_router.delete('/', DeleteTasks);
task_router.delete('/:id', DeleteTask);
task_router.put('/sortbyname', SortTasksByName)
task_router.patch('/:id', CompleteTask);

export default task_router;