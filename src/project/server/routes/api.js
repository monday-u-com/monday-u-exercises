// Define your endpoints here (this is your "controller file")
const express = require('express');
const ItemManager = require('../services/item-manager.js')

const todoRouter = express.Router();
const itemManager = new ItemManager();

todoRouter.get('/', async(req, res) => {
    const {sort, filter} = req.query;
    
    let sortedList = [];

    const sortObj = {
        atoz:{field: 'itemName', order:'ASC'},
        ztoa:{field: 'itemName', order:'DESC'},
        dtou:{field: 'status', order:'DESC'},
        utod:{field: 'status', order:'ASC'},
    }

    if(sort){
        sortedList = await itemManager.orderData(sortObj[sort].field, sortObj[sort].order)
    }
    else if(filter){

        if(filter === 'checked'){
            sortedList = await itemManager.filterData(true)
        }else{
            sortedList = await itemManager.filterData(false)
        }
    }
    else{
        sortedList = await itemManager.getTodoList()
    }
    res.status(200).json(sortedList);
})

todoRouter.post("/", async(req, res) => {
    const {todo} = req.body
    let error = new Error()
    
    if(!todo){
        error.statusCode = 400
        error.message = "Invalid todo, todo is null"
        throw error
    }
    
    try{
        await itemManager.addTodo(todo)
        res.status(201).json(todo);
    }
    catch(error){
        error.statusCode = 400
        error.message = "failed to add todo"
        throw error
    }
})

todoRouter.delete("/:id", async(req, res) => {
    const id = req.params.id

    if(id === "delete-all"){ //some recogintion for delete all todos
        await itemManager.clearAllTodos()
        res.status(200).json({});
        return
    }

    const deletedTodo = await itemManager.deleteTodo(id)
    if(deletedTodo === null){
        let error = new Error()
        error.statusCode = 404
        error.message = "Invalid index to delete item"
        throw error
    }

    res.status(200).json(deletedTodo)
})

todoRouter.put("/:id", async(req, res) => {

    const {checked} = req.query
    
    if(checked !== undefined){
        const {status, index} = req.body
        
        if(status){
            await itemManager.checkTodo(index)
        }
        else{
            await itemManager.uncheckTodo(index)
        }
        res.status(200).json({})
        return 
    }

    const {todo} = req.body
    const id = req.params.id
    const editTodo = await itemManager.editDataInIndex(todo, id)

    if(editTodo === null){
        let error = new Error()
        error.statusCode = 404
        error.message = "Invalid index to update item"
        throw error
     }
 
     res.status(200).json(editTodo)
})

module.exports = todoRouter;