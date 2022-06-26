const express = require("express");

const {
  createItem,
  getItems,
  getItemById,
  deleteItem,
  updateStatusInDb,
  updateDoneTimestamp,
  updateName,
} = require("../controllers/itemController");

const itemRouter = express.Router();

itemRouter.get("/", getItems);

itemRouter.get("/:id", getItemById);

itemRouter.post("/create_item", createItem);

itemRouter.put("/update_status/:id/:newStatus" , updateStatusInDb)

itemRouter.put("/update_done_timestamp/:id/:timestamp", updateDoneTimestamp)

itemRouter.put("/update_name/:id/:newName", updateName)

itemRouter.delete("/delete_item/:id", deleteItem);



module.exports = itemRouter;
