const express = require('express');
const { getTodosSchema, todoSchema, validateSchema, validateIdSchema } = require('../validators/api-validators.js');
const router = express.Router();
const itemManager = require('../services/item-manager');

router.get('/todos', validateSchema(getTodosSchema), (req, res, next) => {
    errWrapper(async () => {
        const { sortBy } = req.query
        const data = await itemManager.getAllItems(sortBy);
        res.status(200).json(data);
    }, next);
});

router.get('/todo/:id', validateSchema(validateIdSchema), (req, res, next) => {
    errWrapper(async () => {
        const { id } = req.params
        const data = await itemManager.getItem(id);
        res.status(200).json(data);
    }, next);
});

router.post('/todo', validateSchema(todoSchema), (req, res, next) => {
    errWrapper(async () => {
        const { todo } = req.body
        const data = await itemManager.addItem(todo);
        res.status(200).json(data);
    }, next);
});

router.put('/todo/:id', validateSchema(validateIdSchema), (req, res, next) => {
    errWrapper(async () => {
        const { id } = req.params
        const { todo } = req.body
        const data = await itemManager.editItem(id, todo);
        if (!data) {
            return res.status(400).json({
                success: false,
                status: 400,
                error: `couldn't find todo with id ${id}`
            })
        }
        res.status(200).json(data);
    }, next);

});

router.delete('/todo/:id', validateSchema(validateIdSchema), (req, res, next) => {
    errWrapper(async () => {
        const { id } = req.params
        const data = await itemManager.removeItem(id);
        res.status(200).json(data);
    }, next);
});

router.delete('/todos', (req, res, next) => {
    errWrapper(async () => {
        const data = await itemManager.removeItem();
        res.status(200).json(data);
    }, next)
});

router.get('/pending-todos', (req, res, next) => {
    errWrapper(async () => {
        const data = await itemManager.getPendingTodos();
        res.status(200).json(data);
    }, next);
});


async function errWrapper(handler, next) {
    try {
        await handler();
    } catch (e) {
        next(e);
    }
}

module.exports = router;



