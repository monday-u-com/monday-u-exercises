const express = require("express");
const taskManager = require("../services/task-manager.js");
const fs = require("fs");

const router = express.Router();

router.get("/getAll", (req, res) => {
   res.status(200).json(taskManager.getTasks());
});

router.post("/add", async (req, res) => {
   const pokemonImagesURLs = await taskManager.add(req.body.task);
   res.status(200).json(pokemonImagesURLs);
});

router.delete("/del", (req, res) => {
   taskManager.clear();
   res.status(200).json({ message: "Successfully cleared" });
});

router.delete("/del/:id", (req, res) => {
   let id = Number.parseInt(req.params.id);
   if (isNaN(id)) {
      let error = Error();
      error.statusCode = 400;
      error.message = "Wrong parameters";
      throw error;
   }
   taskManager.remove(id);
   res.status(200).json({ message: "Successfully deleted task" });
});

router.get("/sort/:way", (req, res) => {
   let way = req.params.way;
   taskManager.sort(way);
   res.status(200).json({ message: "Successfully sorted tasks" });
});

module.exports = router;
