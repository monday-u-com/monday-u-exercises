const express = require("express");

const {
  createItem,
  getItems,
  getItemById,
  deleteItem,
} = require("../controllers/itemController");

const itemRouter = express.Router();

itemRouter.get("/db_items", getItems);

itemRouter.get("/:id", getItemById);

itemRouter.post("/create_item", createItem);

itemRouter.delete("/delete_item/:id", deleteItem);

module.exports = itemRouter;
