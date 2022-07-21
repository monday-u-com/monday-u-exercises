// Define your endpoints here (this is your "controller file")
const express = require("express");
const itemService = require("../services/item_manager");

const todoRouter = express.Router();

todoRouter.get("/", getAll);
todoRouter.post("/", addTask);
todoRouter.put("/", updateTask);
todoRouter.delete("/", deleteTask);
todoRouter.delete("/delete_all", deleteAllTasks);

//controller

async function deleteTask(req, res) {
<<<<<<< HEAD
  const data = await itemService.deleteTask(req.body);
  res.status(200).json(data);
}

async function updateTask(req, res) {
  const data = await itemService.updateTask(req.body);
  res.status(200).json(data);
}

async function getAll(req, res) {
  const data = (await itemService.getAll()) || [];
  res.status(202).json(data);
}

async function addTask(req, res) {
  const data = await itemService.addTask(req.body);
  res.status(200).json(data);
=======
  const task = req.body.task;
  await itemService.deleteTask(task);
  res.end();
}

async function updateTask(req, res) {
  const task = req.body;
  await itemService.updateTask(task);
  res.end();
}

async function getAll(req, res) {
  let data = await itemService.getAll();
  if (!data) data = [];
  res.status(200).json(data);
}

async function addTask(req, res) {
  const body = req.body;
  console.log(body);
  await itemService.addTask(body);
  res.end();
>>>>>>> main
}

async function deleteAllTasks(req, res) {
  await itemService.deleteAllTasks();
  res.end();
}

module.exports = todoRouter;
