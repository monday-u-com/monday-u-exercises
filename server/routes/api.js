const express = require("express");
const taskManager = require("../services/task-manager.js");
const fs = require("fs");
const router = express.Router();

router.get("/getAll", async (req, res) => {
   const allTasks = await taskManager.getTasks();
   res.status(200).json(allTasks);
});

router.post("/add", async (req, res) => {
   await taskManager.add(req.body.task);
   res.status(200).json({ success: true });
});

router.delete("/del", (req, res) => {
   taskManager.clear();
   res.status(200).json({ message: "Successfully cleared" });
});

router.delete("/del/:id", (req, res) => {
   let id = req.params.id;
   if (isNaN(id)) {
      let error = Error();
      error.statusCode = 400;
      error.message = "Wrong parameters";
      throw error;
   }
   taskManager.remove(id);
   res.status(200).json({ message: "Successfully deleted task" });
});

router.get("/sort/:kind", async (req, res) => {
   let kind = req.params.kind;
   const sortedTasks = await taskManager.sort(kind);
   res.status(200).json(sortedTasks);
});

router.post("/checkmark", async (req, res) => {
   await taskManager.checkMarkTask(req.body);
   res.status(200).json({ success: true });
});

module.exports = router;
