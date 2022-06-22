const express = require("express");
const taskManager = require("../services/task-manager.js");
const fs = require("fs");
const cacher = require("../middleware/cacher");
const router = express.Router();

router.get("/getAll", async (req, res) => {
   const allTasks = await taskManager.getTasks();
   res.status(200).json(allTasks);
});

router.post("/add", cacher, async (req, res) => {
   await taskManager.add(req.body.task);
   res.status(200).json({ success: true });
});

router.delete("/del", (req, res) => {
   taskManager.clear();
   res.status(200).json({ message: "Successfully cleared" });
});

router.delete("/del/:taskText", (req, res) => {
   let taskText = req.params.taskText;
   // if (isNaN(id)) {
   //    let error = Error();
   //    error.statusCode = 400;
   //    error.message = "Wrong parameters";
   //    throw error;
   // }
   taskManager.remove(taskText);
   res.status(200).json({ message: "Successfully deleted task" });
});

router.get("/sort/:way", async (req, res) => {
   let way = req.params.way;
   const sortedTasks = await taskManager.sort(way);
   res.status(200).json(sortedTasks);
});

module.exports = router;
