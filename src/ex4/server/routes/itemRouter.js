const express = require('express');
const {validateSchema, itemSchema} = require("../middleware/validation");


const {
    createItem,
    getAllItems,
    getItemById,
    deleteItem,
   
   // getPokemonId,
} = require('../controllers/itemController');


const itemRouter = express.Router();

itemRouter.get('/', getAllItems);
itemRouter.get('/:id',  getItemById);
//itemRouter.get('/:pokemon',  getPokemonId);
itemRouter.post('/create_item',  createItem);

itemRouter.delete('/delete_item/:id', deleteItem)




module.exports = itemRouter;