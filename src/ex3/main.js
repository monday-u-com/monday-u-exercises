import ItemManager from "./item-manager.js"

export default class Main{
    constructor(){
        this.itemManager = new ItemManager(this);
    }

    deleteTodo(index){
        const removedTodo = this.itemManager.deleteTodo(index)
        return removedTodo
    }

    addTodo(todoInput){
        this.itemManager.addTodo(todoInput)
    }

    getDataInIndex(index){ 
        return this.itemManager.getDataInIndex(index)
    }

    getDoneInIndex(index){
        return this.itemManager.getDoneInIndex(index)
    }

    editDataInIndex(value, index){
        return this.itemManager.editDataInIndex(value, index)
    }

    clearAllTodos(){
        this.itemManager.clearAllTodos()
    }

    orderDataAlphabetically() {
        this.itemManager.orderDataAlphabetically()
    }

    orderDataAlphabeticallyReverse() {
        this.itemManager.orderDataAlphabeticallyReverse()
    }

    orderUnDoneToDone() {
        this.itemManager.orderUnDoneToDone()
    }

    orderDoneToUnDone(){
        this.itemManager.orderDoneToUnDone()
    }

    changeDoneStatus(index, status) {
        if(status){
            return this.itemManager.checkTodo(index)
        }
        else{
            return this.itemManager.uncheckTodo(index)
        }
    }

    getDoneTodos(){
        return this.itemManager.getDoneTodos()
    }

    getUnDoneTodos(){
        return this.itemManager.getUnDoneTodos()
    }
}