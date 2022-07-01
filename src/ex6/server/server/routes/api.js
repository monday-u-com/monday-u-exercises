const express = require('express');
const router = express.Router();
const itemManager = require('../services/item_manager');

router.get('/items', async (_, res) => {
    res.send(await itemManager.getItems())
})

router.post('/item', async (req, res) => {
    await itemManager.handleItem(req.body.item)
    res.end()
})

router.post('/item/:id', async (req, res) => {
    await itemManager.updateItem(req.body.item)
    res.end()
})

router.delete('/item', async (req, res) => {
    await itemManager.deleteItem(req.body.item)
    res.end()
})

module.exports = router
