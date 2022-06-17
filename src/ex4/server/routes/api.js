// Define your endpoints here (this is your "controller file")
const express = require("express");
const itemService = require("../services/item_manager");

const todoRouter = express.Router();

todoRouter.get("/", getAll);
todoRouter.post("/", addTask);
todoRouter.delete("/:id", deleteTask);
todoRouter.delete("/", deleteAllTasks);

//controller

async function deleteTask(req, res) {
  let taskId = Number.parseInt(req.params.id);

  if (isNaN(taskId)) {
    let error = Error();
    error.statusCode = 400;
    error.message = "Wrong parameters";
    throw error;
  }

  const task = await itemService.deleteTask(taskId);
  res.status(200).json(task);
}

async function getAll(req, res) {
  let data = await itemService.getAll();
  if (!data) data = [];
  res.status(200).json(data);
}

async function addTask(req, res) {
  const body = req.body;
  await itemService.addTask(body);
  res.status(200).json(body);
}

async function deleteAllTasks(req, res) {
  await itemService.deleteAllTasks();
  res.status(200).json({});
}

module.exports = todoRouter;
