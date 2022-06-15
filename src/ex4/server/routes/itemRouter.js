const express = require('express');
const {validateSchema, itemSchema} = require("../middleware/validation");
const auth = require('../middleware/auth');

const {
    createItem,
    getAllItems,
    getItemById,
    deleteItem,
} = require('../controllers/itemController');


const itemRouter = express.Router();

itemRouter.get('/', getAllItems);
itemRouter.get('/:id', auth, getItemById);
itemRouter.post('/create_item',auth,  createItem);
itemRouter.delete('/delete_item/:id', deleteItem)




module.exports = itemRouter;