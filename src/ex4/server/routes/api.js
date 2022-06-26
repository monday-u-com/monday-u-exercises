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

tasksRouter.post('/addItem', async (req, res, next) => {
  if (!Array.isArray(req.body)) {
    const error = new Error('Input is not of type Array');
    error.statusCode = 400;
    next(error);
  }

  const createdItems = await tasksService.addTasksOrPokemons(req.body);
  res.status(201).json(createdItems);
});

tasksRouter.delete('/deleteItem/:id', async (req, res, next) => {
  await tasksService.deleteItem(req.params.id);
  res.status(200).json(req.params.id);
});

tasksRouter.delete('/deleteAll', async (req, res, next) => {
  await tasksService.deleteAll();
  res.status(200).json(req.body);
});

tasksRouter.get('/changeState/:id', async (req, res, next) => {
  await tasksService.changeState(req.params.id);
  res.status(200).json(req.params.id);
});

tasksRouter.patch('/editItem/:id', async (req, res, next) => {
  await tasksService.editItem(req.params.id, req.body);
  res.status(200).json(req.body);
});

module.exports = tasksRouter;
