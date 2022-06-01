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
        console.log(status)
        if(status){
            this.itemManager.checkTodo(index)
        }
        else{
            this.itemManager.uncheckTodo(index)
        }
    }
}

/* document.addEventListener("DOMContentLoaded", function() {
    onDOMReady();
}) */

/* const pokemonClient = new PokemonClient();
pokemonClient.showTodos() */

/* function onDOMReady() {
    const addTodoButton = document.getElementById("add-todo-button")
    const todoInput = document.getElementById("todo-input")
    const clearAllTodosButton = document.getElementById("clear-all-todos-button")
    const orderSelect = document.getElementById("order-select")

    const pokemonClient = new PokemonClient();
    pokemonClient.showTodos()

    todoInput.addEventListener('keyup', (e) => {
        let enterValue = e.target.value
        const ENTER_KEY = 13
        const inputIsNotEmpty = enterValue.trim() !== ""
        const enterKeyPressed = e.keyCode === ENTER_KEY
    
        if (inputIsNotEmpty){
            handleButtonWhenInputIsEmpty()
    
            if(enterKeyPressed){
                pokemonClient.addTodo()
            }
        }
        else{
            handleButtonWhenInputIsNotEmpty()
        }
    })

    addTodoButton.addEventListener("click", () => {
        pokemonClient.addTodo()
    })
    
    clearAllTodosButton.addEventListener("click", () => {
        pokemonClient.clearAllTodos()
    }) 
    
    orderSelect.addEventListener('change', (e) => {
        if(e.target.value === "A-Z") {
            pokemonClient.filterDataAToZ()
        }
        else{
            pokemonClient.filterDataZToA()
        }
    })
} */

/* function handleButtonWhenInputIsEmpty(){
    const addTodoButton = document.getElementById("add-todo-button")

    addTodoButton.classList.add("active")
    addTodoButton.style.cursor = "pointer"
    addTodoButton.style.opacity = 1
} */

/* function handleButtonWhenInputIsNotEmpty() {
    const addTodoButton = document.getElementById("add-todo-button")

    addTodoButton.classList.remove("active")
    addTodoButton.style.opacity = 0.2
    addTodoButton.style.cursor = "not-allowed"
} */

