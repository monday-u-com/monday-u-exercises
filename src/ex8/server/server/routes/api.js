const express = require('express');
const router = express.Router();
const itemManager = require('../services/item_manager');

router.get('/items', async (_, res) => {
    res.status(200).json(await itemManager.getItems())
})

router.post('/item', async (req, res) => {
    const item = await itemManager.handleItem(req.body.item);
    res.status(201).json(item);
})

router.post('/item/:id', async (req, res) => {
    await itemManager.updateItem(req.body.item)
    res.status(200).json()
})

router.delete('/item', async (req, res) => {
    await itemManager.deleteItem(req.body.item)
    res.status(200).json()
})

module.exports = router
