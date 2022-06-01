import ItemManager from "./ItemManager.js"

export default class PokemonClient{
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

    clearAllTodos(){
        this.itemManager.clearAllTodos()
    }

    orderDataAlphabetically() {
        this.itemManager.orderDataAlphabetically()
    }

    orderDataAlphabeticallyReverse() {
        this.itemManager.orderDataAlphabeticallyReverse()
    }

    filterUnDoneToDone() {
        this.itemManager.filterUnDoneToDone()
    }

    filterDoneToUnDone(){
        this.itemManager.filterDoneToUnDone()
    }

    changeDoneStatus(index, status) {
        if(status){
            return this.itemManager.checkTodo(index)
        }
        else{
            return this.itemManager.uncheckTodo(index)
        }
    }
}