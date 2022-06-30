// Define your endpoints here (this is your "controller file")
const itemManager = require("../services/item_manager.js");
const express = require("express");
const router = express.Router();

//fech all tasks from tasks.json file
router.get("/", async (req, res) => {
  const tasks = await itemManager.getTasks();
  res.send(tasks);
});

//add new task to tasks.json file
router.post("/", async (req, res) => {
  const taskInput = req.body.itemName;
  const isCompleted = req.body.status;
  const position = req.body.position;
  const response = await itemManager.addTask(taskInput, isCompleted, position);
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(409).json({ error: "Task already exists" });
  }
});

router.put("/resort", (req, res) => {
  console.log("=============here===============");
  const sorted = itemManager.reSortTasks(req.body);
  if (sorted) {
    res.status(200).json({ message: "Tasks was resorted" });
  } else {
    res.status(500).json({ error: "Error" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedContent = req.body;
  const isUpdated = await itemManager.updateTask(id, updatedContent);
  if (isUpdated) {
    res.status(200).json(req.body);
  } else {
    res.status(404).json({ error: "Task does not exist" });
  }
});

//remove task from tasks.json file
router.delete("/:id", async (req, res) => {
  const taskID = req.params.id;
  await itemManager.RemoveTaskFromDB(taskID);
  res.status(200).json({ message: "Task removed" });
});

router.delete("/", async (req, res) => {
  await itemManager.RemoveAllTasksFromDB();
  res.status(200).json({ message: "All tasks removed" });
});

module.exports = router;
