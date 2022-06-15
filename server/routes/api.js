// Define your endpoints here (this is your "controller file")
const express = require("express");
const taskManager = require("../services/task-manager.js");
const fs = require("fs");

const router = express.Router();

router.get("/getAll", (req, res) => {
   res.status(200).json(taskManager.getTasks());
});

router.post("/add", (req, res) => {
   console.log(req.body);
   taskManager.add(req.body);
   res.status(200).json(taskManager.getTasks());
});

router.delete("/del", (req, res) => {
   taskManager.clear();
   res.status(200).json(taskManager.getTasks());
});

router.delete("/del/:id", (req, res) => {
   let id = Number.parseInt(req.params.id);
   if (isNaN(id)) {
      let error = Error();
      error.statusCode = 400;
      error.message = "wrong parameters";
      throw error;
   }
   taskManager.remove(id);
   res.status(200).json(taskManager.getTasks());
});

router.get("/sort/:way", (req, res) => {
   let way = parseInt(req.params.way);
   taskManager.sort(way);
   res.status(200).json(taskManager.getTasks());
});

module.exports = router;
