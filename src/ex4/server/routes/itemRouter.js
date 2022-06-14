const express = require('express');
const {validateSchema, itemSchema} = require("../middleware/validation");
const auth = require('../middleware/auth');

const {
    createItem,
    getAllItems,
} = require('../controllers/itemController');


const itemRouter = express.Router();

itemRouter.get('/', auth, getAllItems);
//itemRouter.post('/',auth,validateSchema(itemSchema) ,createItem);




module.exports = itemRouter;