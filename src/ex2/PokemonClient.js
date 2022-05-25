import ItemManager from "./ItemManager.js"

const todoListElement = document.getElementById("todo-list")
const addTodoButton = document.getElementById("add-todo-button")
const todoInput = document.getElementById("todo-input")
const clearAllTodosButton = document.getElementById("clear-all-todos-button")
const sumTodos = document.getElementById("sum-todos")
const orderSelect = document.getElementById("order-select")
const enterTodos = document.getElementById("enter-todos")

export default class PokemonClient{
    constructor(){
        this.itemManager = new ItemManager(this);
    }

    showTodos() {
        this.showMatchUiByTodosNumber() 
        this.createTodoListItems() 
    }

    showMatchUiByTodosNumber() {
        sumTodos.textContent = this.itemManager.todoListSize()
        
        if(this.itemManager.todoListSize() > 0){
            this.updateUIWithNonEmptyInput()
        }
        else{
            this.updateUIWithEmptyInput()
        }
    }

    updateUIWithNonEmptyInput() {
        clearAllTodosButton.classList.add("active")
        clearAllTodosButton.style.cursor = "pointer"
        enterTodos.style.display = "none"
    }

    updateUIWithEmptyInput() {
        clearAllTodosButton.classList.remove("active")
        clearAllTodosButton.style.cursor = "not-allowed"
        enterTodos.style.display = "block"
    }

    createTodoListItems() {
        this.createItemsByCurrentData()
        this.createItemsDeleteFuctionality()
        
        todoInput.value = "" //clear input
    }

    createItemsByCurrentData(){
        let listItems = ""

        this.itemManager.getTodoList().forEach((todo) => { 
            listItems += `<li>${todo}
                <span class="delete">
                    <i class="fas fa-trash"></i>
                </span>
                </li>
            `
        })
    
        todoListElement.innerHTML = listItems
    }

    createItemsDeleteFuctionality(){
        const deleteItems = document.querySelectorAll(".delete")

        for (let i = 0; i < deleteItems.length; i++) {
            deleteItems[i].addEventListener("click", () => this.deleteTodo(i))
        }
    }

    deleteTodo(index){
        const removedTodo = this.itemManager.deleteTodo(index)
        this.showTodos()
        alert(`removed new todo ${removedTodo}`) 
    }

    addTodo(){
        let enterValue = todoInput.value

        if(enterValue.trim() === ""){
            alert("todo cannot be empty")
        }
        else{
            alert(`added new todo ${enterValue}`)
        }

        this.itemManager.addTodo(enterValue)
        addTodoButton.classList.remove("active")
    }

    clearAllTodos(){
        this.itemManager.clearAllTodos()
        alert("all todos cleared")
    }
}

const pokemonClient = new PokemonClient();
pokemonClient.showTodos()

todoInput.onkeyup = (e) => {
    let enterValue = todoInput.value

    if (enterValue.trim() !== ""){
        addTodoButton.classList.add("active")
        addTodoButton.style.cursor = "pointer"
        addTodoButton.style.opacity = 1

        if(e.keyCode === 13){
            pokemonClient.addTodo()
        }
    }
    else{
        addTodoButton.classList.remove("active")
        addTodoButton.style.opacity = 0.2
        addTodoButton.style.cursor = "not-allowed"
    }
}

addTodoButton.addEventListener("click", () => {
    pokemonClient.addTodo()
})

clearAllTodosButton.addEventListener("click", () => {
    pokemonClient.clearAllTodos()
}) 
