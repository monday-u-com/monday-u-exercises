const express  = require("express");
const {
  createItem,
  getAll,
  deleteItem,
  deleteAll,
  updateItemStatus,
  editTodoName
} = require( "../controllers/itemsController.js");
const itemRouter = express.Router();

itemRouter.post("/", createItem);

itemRouter.get("/", getAll);

itemRouter.delete("/", deleteAll);

itemRouter.delete("/:id", deleteItem);

itemRouter.put("/:id", editTodoName);

itemRouter.put("/updateItemStatus/:id", updateItemStatus);


module.exports =  itemRouter;
