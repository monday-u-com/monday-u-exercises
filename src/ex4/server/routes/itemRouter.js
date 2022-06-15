const express = require('express');
const {validateSchema, itemSchema} = require("../middleware/validation");


const {
    createItem,
    getAllItems,
    getItemById,
    deleteItem,
} = require('../controllers/itemController');


const itemRouter = express.Router();

itemRouter.get('/', getAllItems);
itemRouter.get('/:id',  getItemById);
itemRouter.post('/create_item',  createItem);
itemRouter.delete('/delete_item/:id', deleteItem)




module.exports = itemRouter;