const express = require("express");
const storage = require('../services/storageService');


const {
  createItem,
  getAllItems,
  getItemById,
  deleteItem,
} = require("../controllers/itemController");

const itemRouter = express.Router();

//itemRouter.get("/", getAllItems);
//itemRouter.get("/", getAllItems);
itemRouter.get('/db_items', async (_, res) => {
  res.send(await storage.getItems());
});
itemRouter.get("/:id", getItemById);


itemRouter.post("/create_item", createItem);

itemRouter.delete("/delete_item/:id", deleteItem);

module.exports = itemRouter;
