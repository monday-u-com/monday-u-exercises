import ItemClient from './clients/item-client.js'

export default class Main{
    constructor(){
        this.itemClient = new ItemClient()
        this.todoList = []
        this.query = '';
    }

    async showTodos() {
        await this.getTotdoList()
        this.createTodoListItems() 
    }

    showMatchUiByTodosNumber() {
        const sumTodos = document.getElementById("sum-todos")
        sumTodos.textContent = this.todoList.length
        
        if(this.todoList.length > 0){
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
        
        todoInput.value = "" //clear input
    }

    createItemsByCurrentData(){
        const todoListElement = document.getElementById("todo-list")

        const listItems = this.createListItems();
        todoListElement.innerHTML = listItems
        this.showMatchUiByTodosNumber() 
        this.createItemsFuctionality()
        
    }

    async getTotdoList() {
        this.loaderActiveDeActive(true)
        this.todoList = await this.itemClient.getTodoList(this.query)
    }

    createListItems(){
        let listItems = ""
        this.todoList.forEach((todo) => { 
            let image = ""
            if(todo.isPokemon){
                image = `<img class="image" src="${todo.imagePokemonPath}" />`
            }

            let checked = `<input class="check-todo" id="${todo.id}" type="checkbox">`
            if(todo.status){
                checked = `<input class="check-todo" id="${todo.id}" type="checkbox" checked>`
            }

            listItems += 
            `<li class="todo-item">
                ${checked}
                <div class="todo-title">${todo.itemName}</div>
                ${image}
                <div class="actions">
                    <div>
                        <span class="action-btn delete" id=${todo.id}>
                            <i class="fas fa-trash"></i>
                        </span>
                    </div>
                    <div>
                        <span class="action-btn edit" data-title="${todo.itemName}" id=${todo.id}>
                            <i class="fas fa-edit"></i>
                        </span>
                    </div>
                </div>
            </li>
            `
        })

        this.loaderActiveDeActive(false)

        return listItems
    }

    async createItemsFuctionality(){

        this.createDeleteEvents()
        this.createEditEvents()
        this.createCheckEvents()      
    }

    createDeleteEvents(){
        const deleteItems = document.querySelectorAll(".delete")

        deleteItems.forEach((item) => {
            item.addEventListener("click", () => this.deleteTodo(item.id))
        })
    }

    createEditEvents(){
        const editItems = document.querySelectorAll(".edit")

        editItems.forEach((item) => {
            item.addEventListener("click", async() => {
                const data = item.getAttribute("data-title")
                
                let value = prompt("change this todo to regular todo", data)
                if(value === null){
                    return
                }
                await this.editDataInIndex(value, item.id)
            })
        })
    }

    createCheckEvents(){
        const checkTodos = document.querySelectorAll(".check-todo")

        checkTodos.forEach((item) => {
            item.addEventListener("change", async() => {
                const status = item.checked
                await this.changeDoneStatus(item.id, status)     
            })
        })
    }

    async deleteTodo(index){
        this.loaderActiveDeActive(true)
        const removedTodo = await this.itemClient.deleteTodo(index)
        this.loaderActiveDeActive(false)
        this.showTodos()
        alert(`removed new todo ${removedTodo}`) 
    }

    async addTodo(){
        const todoInputEl = document.getElementById("todo-input")
        const addTodoButton = document.getElementById("add-todo-button")

        let enterValue = todoInputEl.value
        const inputIsEmpty = enterValue.trim() === ""

        if(inputIsEmpty){
            alert("todo cannot be empty")
            return
        }
        else{
            alert(`added new todo ${enterValue}`)
        }
        
        this.loaderActiveDeActive(true)
        await this.itemClient.addTodo(enterValue)
        this.loaderActiveDeActive(false)
        this.showTodos()
        addTodoButton.classList.remove("active")
    }

    async editDataInIndex(value, index){
        this.loaderActiveDeActive(true)
        const editedData = await this.itemClient.editTodoIndex(value, index)
        this.loaderActiveDeActive(false)
        
        alert(`data edited to ${editedData.itemName}`)
        this.showTodos()
    }

    async clearAllTodos(){
        const allItemsDeleteRoute = "delete-all" //some recogintion for delete all todos
        await this.itemClient.deleteTodo(allItemsDeleteRoute)
        alert("all todos cleared")
        this.showTodos()
    }

    async sortTodos(value) {
        if(value !== ''){
            this.query = `?sort=${value}`;
        }
        else{
            this.query = ''
        }
        this.showTodos();
    }

    async changeDoneStatus(index, status) {
        await this.itemClient.editCheckTodoIndex(index, status);
        this.showTodos()
    }

    async fileterDoneUndoneTodos(value) {
        if(value !== ''){
            this.query = `?filter=${value}`;
        }
        else{
            this.query = ''
        }
        this.showTodos();
    }

    loaderActiveDeActive(value){
        const loader = document.getElementById("loader")
        if(value){
            loader.style.display = "block"
        }
        else {
            loader.style.display = "none"
        }
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
    const switchBtn = document.getElementById("switch-input")

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
    
    orderSelect.addEventListener('change',  (e) => {
        main.sortTodos(e.target.value)
    })

    switchBtn.addEventListener('click', (e) => {
        if(e.target.checked){
            main.fileterDoneUndoneTodos('checked');
        }else{

            main.fileterDoneUndoneTodos('unchecked');
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