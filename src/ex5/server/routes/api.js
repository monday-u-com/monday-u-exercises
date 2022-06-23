const express  = require("express");
const {
  createItem,
  deleteItem,
  getAll,
  deleteAll,
  updateItemStatus
} = require( "../controllers/itemsController.js");
const itemRouter = express.Router();

itemRouter.post("/", createItem);
itemRouter.get("/", getAll);
itemRouter.delete("/", deleteAll);
itemRouter.delete("/:id", deleteItem);
itemRouter.put("/:id", updateItemStatus);


module.exports =  itemRouter;
