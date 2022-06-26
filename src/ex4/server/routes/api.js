// Define your endpoints here (this is your "controller file")
const express = require('express');
const tasksService = require('../services/item_manager');

const tasksRouter = express.Router();

tasksRouter.get('/getAll', async (req, res, next) => {
  const tasks = await tasksService.getAll();

  if (!tasks) {
    const error = new Error("couldn't get tasks");
    error.statusCode = 404;
    next(error);
  }

  res.status(200).json(tasks);
});

tasksRouter.post('/addTask', async (req, res, next) => {
  if (!Array.isArray(req.body)) {
    const error = new Error('Input is not of type Array');
    error.statusCode = 400;
    next(error);
  }

  await tasksService.addTasksOrPokemons(req.body);

  res.status(201).json(req.body);
});

tasksRouter.delete('/deleteTask', async (req, res, next) => {
  if (!req.body) {
    const error = new Error('Item cannot be empty');
    error.statusCode = 400;
    next(error);
  }

  const result = await tasksService.deleteTask(req.body);
  if (!result) {
    const error = new Error('Item does not exists');
    error.statusCode = 404;
    next(error);
  }

  res.status(200).json(req.body);
});

tasksRouter.delete('/deleteAll', async (req, res, next) => {
  await tasksService.deleteAll();
  res.status(200).json(req.body);
});

module.exports = tasksRouter;
