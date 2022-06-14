// Define your endpoints here (this is your "controller file")
import express from 'express'
import ItemManager from '../services/item_manager.js'

const router = express.Router()
const itemManager = new ItemManager()

router.get('/', itemManager.getItems)
router.post('/', itemManager.postItem)
router.delete('/:id', itemManager.deleteItem)

export default router