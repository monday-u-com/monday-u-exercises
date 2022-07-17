const  ItemManager = require( "../services/itemManager.js");
const  valid  = require( "../utils/utils.js");



async function createItem(req, res, next) {
  try {
    const item = req.body.item;
    const { isPokemon, elementsArr } = valid.validation(item);
    const data  = await ItemManager.addItem(isPokemon, elementsArr);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

async function deleteItem(req, res, next) {
  try {
    const itemId = (req.params.id);
    await ItemManager.deleteItem(itemId);
    res.status(200).json(itemId);
  } catch (err) {
    next(err);
  }
}
async function getAll(req, res, next) {
  try {
    const items = await ItemManager.getAll();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
}
async function deleteAll(req, res, next) {
    try {
      await ItemManager.deleteAll();
      res.status(200).json('All Items was deleted');
    } catch (err) {
      next(err);
    }
  }
async function updatestatus(req, res, next){
    try {
      const itemId = req.params.id
      const newStatus = req.body.status
      await ItemManager.statusUpdateDb(itemId,newStatus);
      res.status(200).json('status was changed');
    } catch (err) {
      next(err);
    }
  }
  async function editTaskName(req, res, next)
  {
    try {
      const itemId = req.params.id
      const newTaskName = req.body.task
      await ItemManager.editTaskNameInDb(itemId,newTaskName);
      res.status(200).json('name changed');
    } catch (err) {
      next(err);
    }
  }

  module.exports = {
    createItem,
    deleteItem,
    getAll,
    deleteAll,
    updatestatus,
    editTaskName
    
  }