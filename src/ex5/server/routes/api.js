// Define your endpoints here (this is your "controller file")
const express = require("express");
const itemService = require("../services/item_manager");

const todoRouter = express.Router();

todoRouter.get("/", getAll);
todoRouter.post("/", addTask);
todoRouter.put("/", updateTask);
todoRouter.delete("/", deleteTask);
todoRouter.delete("/delete_all", deleteAllTasks); //can't choose right function with end-point delete_all

//controller

async function deleteTask(req, res) {
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
  await itemService.addTask(body);
  res.end();
}

async function deleteAllTasks(req, res) {
  await itemService.deleteAllTasks();
  res.end();
}

module.exports = todoRouter;
