<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ex5
const express  = require("express");
const {
  createItem,
  getAll,
  deleteItem,
  deleteAll,
<<<<<<< HEAD
  updatestatus,
  editTaskName
=======
  updateItemStatus
>>>>>>> ex5
} = require( "../controllers/itemsController.js");
const itemRouter = express.Router();

itemRouter.post("/", createItem);

itemRouter.get("/", getAll);

itemRouter.delete("/", deleteAll);

itemRouter.delete("/:id", deleteItem);

<<<<<<< HEAD
itemRouter.put("/:id", editTaskName);

itemRouter.put("/updatestatus/:id", updatestatus);


module.exports =  itemRouter;
=======
import express from "express";
const itemRouter = express.Router();
import {
  createItem,
  deleteItem,
  getAll,
  deleteAll,
} from "../controllers/itemsController.js";

itemRouter.post("/", createItem);
itemRouter.get("/", getAll);
itemRouter.delete("/", deleteAll);
itemRouter.delete("/:id", deleteItem);
console.log('k');
console.log('Hello');
export default itemRouter;
>>>>>>> new_branch
=======
itemRouter.put("/:id", updateItemStatus);


module.exports =  itemRouter;
>>>>>>> ex5
