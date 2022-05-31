import ItemManager from "./ItemManager.js"

export default class PokemonClient{
    constructor(){
        this.itemManager = new ItemManager(this);
    }

    showTodos() {
        //this.showMatchUiByTodosNumber() 
        //this.createTodoListItems() 
        
        this.itemManager.getTodoList().forEach((todo,index) => {
            console.log(index + ": " + todo.title +" is " + (todo.done ? "done" : "not done"))
        }) 
    }

    /* showMatchUiByTodosNumber() {
        //const sumTodos = document.getElementById("sum-todos")
        //sumTodos.textContent = this.itemManager.todoListSize()
        
        if(this.itemManager.todoListSize() > 0){
            this.updateUIWithNonEmptyInput()
        }
        else{
            this.updateUIWithEmptyInput()
        }
    } */

    /* updateUIWithNonEmptyInput() {
        const enterTodos = document.getElementById("enter-todos")
        const clearAllTodosButton = document.getElementById("clear-all-todos-button")

        clearAllTodosButton.classList.add("active")
        clearAllTodosButton.style.cursor = "pointer"
        enterTodos.style.display = "none"
    } */

    /* updateUIWithEmptyInput() {
        const enterTodos = document.getElementById("enter-todos")
        const clearAllTodosButton = document.getElementById("clear-all-todos-button")

        clearAllTodosButton.classList.remove("active")
        clearAllTodosButton.style.cursor = "not-allowed"
        enterTodos.style.display = "block"
    } */

    /* createTodoListItems() {
        //const todoInput = document.getElementById("todo-input")

        //this.createItemsByCurrentData()
        //this.createItemsDeleteFuctionality()
        
        //todoInput.value = "" //clear input
    } */

    /* createItemsByCurrentData(){
        const todoListElement = document.getElementById("todo-list")
        let listItems = ""

        this.itemManager.getTodoList().forEach((todo) => { 
            listItems += `<li class="todo-item">${todo}
                <div>
                    <span class="action-btn delete">
                        <i class="fas fa-trash"></i>
                    </span>
                </div>
                </li>
            `
        })
    
        todoListElement.innerHTML = listItems
    } */

    /* createItemsDeleteFuctionality(){
        const deleteItems = document.querySelectorAll(".delete")

        for (let i = 0; i < deleteItems.length; i++) {
            deleteItems[i].addEventListener("click", () => this.deleteTodo(i))
        }
    } */

    deleteTodo(index){
        const removedTodo = this.itemManager.deleteTodo(index)
        console.log(`removed new todo ${removedTodo}`) 
    }

    addTodo(todoInput){
        //const todoInput = document.getElementById("todo-input")
        //const addTodoButton = document.getElementById("add-todo-button")

        let enterValue = todoInput
        const inputIsEmpty = enterValue.trim() === ""

        if(inputIsEmpty){
            console.log("todo cannot be empty")
        }
        else{
            console.log(`added new todo ${enterValue}`)
        }

        this.itemManager.addTodo(enterValue)
        //addTodoButton.classList.remove("active")
    }

    clearAllTodos(){
        this.itemManager.clearAllTodos()
        console.log("all todos cleared")
    }

    filterDataAToZ() {
        this.itemManager.filterDataAToZ()
    }

    filterDataZToA() {
        this.itemManager.filterDataZToA()
    }

    changeDoneStatus(index, status) {
        console.log(status)
        if(status === 'true'){
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

