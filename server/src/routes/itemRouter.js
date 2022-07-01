// Define your endpoints here (this is your "controller file")
const express = require("express");

const {
  addNewInputHandler,
  getAllTasksHandler,
  deleteTaskHandler,
  deleteAllTaskHandler,
  sortTasksHandler,
  flipStatusHandler,
  updateTaskTextHandler,
} = require("../controllers/itemController");
const itemRouter = express.Router();

itemRouter.get("/items", getAllTasksHandler);
itemRouter.get("/items/sort/:direction", sortTasksHandler);
itemRouter.delete("/item/:id", deleteTaskHandler);
itemRouter.delete("/items", deleteAllTaskHandler);
itemRouter.post("/item", addNewInputHandler);
itemRouter.patch("/item/status/:id", flipStatusHandler);
itemRouter.patch("/item/text/:id/:text", updateTaskTextHandler);

module.exports = itemRouter;
