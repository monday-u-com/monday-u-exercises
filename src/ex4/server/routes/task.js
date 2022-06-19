import express from 'express';
import { checkSchema } from 'express-validator';
import {
    GetTasks,
    AddTask,
    DeleteTasks,
    DeleteTask,
    CompleteTask,
    SortTasksByName
} from '../controllers/TaskController.js';
import { SCHEMA_ID, SCHEMA_TASK } from '../validation/scehma.js';

const task_router = express.Router();

task_router.get('/', GetTasks);
task_router.post('/', checkSchema(SCHEMA_TASK), AddTask);
task_router.delete('/', DeleteTasks);
task_router.delete('/:id', checkSchema(SCHEMA_ID), DeleteTask);
task_router.put('/sortbyname', SortTasksByName)
task_router.patch('/:id', checkSchema(SCHEMA_ID), CompleteTask);

export default task_router;