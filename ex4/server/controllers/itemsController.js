import ItemManager from "../services/itemManager.js";
import { validation } from "../utils/utils.js";

export async function createItem(req, res, next) {
  try {
    const item = req.body.item;
    const { isPokemon, elementsArr } = validation(item);
    const data  = await ItemManager.addItem(isPokemon, elementsArr);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

export async function deleteItem(req, res, next) {
  try {
    const itemId = parseInt(req.params.id);
    await ItemManager.deleteItem(itemId);
    res.status(200).json(itemId);
  } catch (err) {
    next(err);
  }
}
export async function getAll(req, res, next) {
  try {
    const items = await ItemManager.getAll();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
}

export async function deleteAll(req, res, next) {
    try {
      await ItemManager.deleteAll();
      res.status(200).json('All Items was deleted');
    } catch (err) {
      next(err);
    }
  }

