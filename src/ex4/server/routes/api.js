// Define your endpoints here (this is your "controller file")
import express from 'express'
import ItemManager from '../services/item_manager.js'

const router = express.Router()
const itemManager = new ItemManager()

router.get('/', (req, res) => {
    return itemManager.getItems(req, res)
})
router.post('/', (req, res) => {
    return itemManager.postItem(req, res)
})
router.delete('/:id', (req, res) => {
    return itemManager.deleteItem(req, res)
})

router.put('/status/:id', (req, res) => {
    const response = itemManager.changeItemStatus(req, res)
    console.log(response)
    return response
})

export default router