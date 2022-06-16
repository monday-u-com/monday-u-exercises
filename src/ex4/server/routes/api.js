// Define your endpoints here (this is your "controller file")
const itemManager = require("../services/item_manager.js");
const express = require("express");
const router = express.Router();

//fech all tasks from tasks.json file
router.get("/", (req, res) => {
  const tasks = itemManager.getTasks();
  res.send(tasks);
});

router.get("/length", (req, res) => {
  const tasksLength = itemManager.getTasksLength();
  res.status(200).send({ length: tasksLength });
});

//add new task to tasks.json file
router.post("/", async (req, res) => {
  const taskInput = req.body.content;
  const isCompleted = req.body.isCompleted;
  const isAdded = await itemManager.addTask(taskInput, isCompleted);
  if (isAdded) {
    res.status(200).json(req.body);
  } else {
    res.status(400).json({ error: "Task already exists" });
  }
});

router.put("/:id", async (req, res) => {
  const taskID = req.params.id;
  const isUpdated = await itemManager.toggleCompleted(taskID);
  if (isUpdated) {
    res.status(200).json(req.body);
  } else {
    res.status(400).json({ error: "Task does not exist" });
  }
});

//remove task from tasks.json file
router.delete("/:id", (req, res) => {
  const taskID = req.params.id;
  itemManager.removeTask(taskID);
  res.status(200).json({ message: "Task removed" });
});

router.delete("/", (req, res) => {
  itemManager.removeAllTasks();
  res.status(200).json({ message: "All tasks removed" });
});

module.exports = router;
