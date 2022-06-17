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


export default itemRouter;
