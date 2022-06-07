import ItemManager from "./item-manager.js"

export default class Main{
    constructor(){
        this.itemManager = new ItemManager(this);
    }

    showTodos() {
        this.showMatchUiByTodosNumber() 
        this.createTodoListItems() 
    }

    showMatchUiByTodosNumber() {
        const sumTodos = document.getElementById("sum-todos")
        sumTodos.textContent = this.itemManager.todoListSize()
        
        if(this.itemManager.todoListSize() > 0){
            this.updateUIWithNonEmptyInput()
        }
        else{
            this.updateUIWithEmptyInput()
        }
    }

    updateUIWithNonEmptyInput() {
        const enterTodos = document.getElementById("enter-todos")
        const clearAllTodosButton = document.getElementById("clear-all-todos-button")

        clearAllTodosButton.classList.add("active")
        clearAllTodosButton.style.cursor = "pointer"
        enterTodos.style.display = "none"
    }

    updateUIWithEmptyInput() {
        const enterTodos = document.getElementById("enter-todos")
        const clearAllTodosButton = document.getElementById("clear-all-todos-button")

        clearAllTodosButton.classList.remove("active")
        clearAllTodosButton.style.cursor = "not-allowed"
        enterTodos.style.display = "block"
    }

    createTodoListItems() {
        const todoInput = document.getElementById("todo-input")

        this.createItemsByCurrentData()
        this.createItemsDeleteFuctionality()
        
        todoInput.value = "" //clear input
    }

    createItemsByCurrentData(){
        const todoListElement = document.getElementById("todo-list")

        const listItems = this.createListItems()
    
        todoListElement.innerHTML = listItems
    }

    createListItems(){
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

        return listItems
    }

    createItemsDeleteFuctionality(){
        const deleteItems = document.querySelectorAll(".delete")

        deleteItems.forEach((item, index) => {
            item.addEventListener("click", () => this.deleteTodo(index))
        })
    }

    deleteTodo(index){
        const removedTodo = this.itemManager.deleteTodo(index)
        alert(`removed new todo ${removedTodo}`) 
    }

    addTodo(){
        const todoInput = document.getElementById("todo-input")
        const addTodoButton = document.getElementById("add-todo-button")

        let enterValue = todoInput.value
        const inputIsEmpty = enterValue.trim() === ""

        if(inputIsEmpty){
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

    filterDataAToZ() {
        this.itemManager.filterDataAToZ()
    }

    filterDataZToA() {
        this.itemManager.filterDataZToA()
    }
}

document.addEventListener("DOMContentLoaded", function() {
    onDOMReady();
})

function onDOMReady() {
    const addTodoButton = document.getElementById("add-todo-button")
    const todoInput = document.getElementById("todo-input")
    const clearAllTodosButton = document.getElementById("clear-all-todos-button")
    const orderSelect = document.getElementById("order-select")

    const main = new Main();
    main.showTodos()

    todoInput.addEventListener('keyup', (e) => {
        let enterValue = e.target.value
        const ENTER_KEY = 13
        const inputIsNotEmpty = enterValue.trim() !== ""
        const enterKeyPressed = e.keyCode === ENTER_KEY
    
        if (inputIsNotEmpty){
            handleButtonWhenInputIsEmpty()
    
            if(enterKeyPressed){
                main.addTodo()
            }
        }
        else{
            handleButtonWhenInputIsNotEmpty()
        }
    })

    addTodoButton.addEventListener("click", () => {
        main.addTodo()
    })
    
    clearAllTodosButton.addEventListener("click", () => {
        main.clearAllTodos()
    }) 
    
    orderSelect.addEventListener('change', (e) => {
        if(e.target.value === "A-Z") {
            main.filterDataAToZ()
        }
        else{
            main.filterDataZToA()
        }
    })
}

function handleButtonWhenInputIsEmpty(){
    const addTodoButton = document.getElementById("add-todo-button")

    addTodoButton.classList.add("active")
    addTodoButton.style.cursor = "pointer"
    addTodoButton.style.opacity = 1
}

function handleButtonWhenInputIsNotEmpty() {
    const addTodoButton = document.getElementById("add-todo-button")

    addTodoButton.classList.remove("active")
    addTodoButton.style.opacity = 0.2
    addTodoButton.style.cursor = "not-allowed"
}

