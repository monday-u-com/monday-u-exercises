

const  ItemManager  = require( "../services/itemManager.js");
const  validation    = require( "../utils/utils.js");
async function createItem(req, res, next) {
  try {
    const item = req.body.item;
    const { isPokemon, elementsArr } = validation(item);
    const data  = await ItemManager.addItem(isPokemon, elementsArr);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

async function deleteItem(req, res, next) {
  try {
    const itemId = parseInt(req.params.id);
    await ItemManager.deleteItem(itemId);
    res.status(200).json(itemId);
  } catch (error) {
    next(error);
  }
}
async function getAll(req, res, next) {
  try {
    const items = await ItemManager.getAll();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
}
async function deleteAll(req, res, next) {
    try {
      await ItemManager.deleteAll();
      res.status(200).json('All Items was deleted');
    } catch (error) {
      next(error);
    }
  }
async function updateItemStatus(req, res, next){
    try {
      const itemId = req.params.id
      const newStatus = req.body.status
      console.log(itemId,newStatus)
      await ItemManager.statusUpdateDb(itemId,newStatus);
      res.status(200).json('status was changed');
    } catch (error) {
      next(error);
    }
  }

  module.exports = {
    createItem,
    deleteItem,
    getAll,
    deleteAll,
    updateItemStatus
    
  }