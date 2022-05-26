document.addEventListener("DOMContentLoaded", function() {
    onDOMReady();
})

function onDOMReady() {
    
    const addTodoButton = document.getElementById("add-todo-button")
    const todoInput = document.getElementById("todo-input")
    const clearAllTodosButton = document.getElementById("clear-all-todos-button")
    const orderSelect = document.getElementById("order-select")

    let todoList = [] //array for storing data 
    
    showTodos()

    todoInput.addEventListener("keyup",(e) => {
        
        let enterValue = e.target.value
        const ENTER_KEY = 13
        const inputIsNotEmpty = enterValue.trim() !== ""
        const enterKeyPressed = e.keyCode === ENTER_KEY

        if (inputIsNotEmpty) {
            addTodoButtonActive()
            if(enterKeyPressed){
                addTodo()
            }
        }
        else{
            addTodoButtonNonActive()
        }
    })

    function addTodoButtonActive(){
        const addTodoButton = document.getElementById("add-todo-button")
        addTodoButton.classList.add("active")
        addTodoButton.style.cursor = "pointer"
        addTodoButton.style.opacity = 1
    }

    function addTodoButtonNonActive(){
        const addTodoButton = document.getElementById("add-todo-button")
        addTodoButton.classList.remove("active")
        addTodoButton.style.opacity = 0.2
        addTodoButton.style.cursor = "not-allowed"
    }

    addTodoButton.addEventListener("click", () => {
        addTodo()
    })

    clearAllTodosButton.addEventListener("click", () => {
        let dataFromLS = localStorage.getItem("new-todo")
    
        if(dataFromLS === null){
            todoList = []
        }
        else{
            todoList = JSON.parse(dataFromLS)
            todoList = [] //initialize array again
        }
    
        alert('removed all todos')
        localStorage.setItem("new-todo", JSON.stringify(todoList))
        showTodos()
    })

    orderSelect.addEventListener('change', (e) => {
        let dataFromLS = localStorage.getItem("new-todo")
        todoList = JSON.parse(dataFromLS)
    
        if(e.target.value === "A-Z") {
            todoList = todoList.sort()
        }
        else{
            todoList = todoList.sort().reverse()
        }
    
        localStorage.setItem("new-todo", JSON.stringify(todoList))
        showTodos()
    })
}


function addTodo(){
    const todoInput = document.getElementById("todo-input")
    const addTodoButton = document.getElementById("add-todo-button")
    let enterValue = todoInput.value
    const inputIsEmpty = enterValue.trim() === ""

    if(inputIsEmpty){
        alert("todo cannot be empty")
        return
    }

    checkIfExistDataFromLS()
    pushEnteredDataToLS(enterValue)
    showTodos()

    addTodoButton.classList.remove("active")
}

function checkIfExistDataFromLS(){
    let dataFromLS = localStorage.getItem("new-todo")

    if(dataFromLS === null){
        todoList = []
    }
    else{
        todoList = JSON.parse(dataFromLS)
    }
}

function pushEnteredDataToLS(enterValue){
    todoList.push(enterValue)
    localStorage.setItem("new-todo", JSON.stringify(todoList))
    alert(`added new todo ${enterValue}`)
}

function showTodos() {
    checkIfExistDataFromLS()
    showMatchUiByTodosNumber()
    createTodoListItems()
}

function showMatchUiByTodosNumber() {
    const sumTodos = document.getElementById("sum-todos")
    const enterTodos = document.getElementById("enter-todos")
    const clearAllTodosButton = document.getElementById("clear-all-todos-button")

    sumTodos.textContent = todoList.length
    
    if(todoList.length > 0){
        clearAllTodosButton.classList.add("active")
        clearAllTodosButton.style.cursor = "pointer"
        enterTodos.style.display = "none"
    }
    else{
        clearAllTodosButton.classList.remove("active")
        clearAllTodosButton.style.cursor = "not-allowed"
        enterTodos.style.display = "block"
    }
}

function createTodoListItems() {
    const todoListElement = document.getElementById("todo-list")
    const todoInput = document.getElementById("todo-input")
    let listItems = ""

    todoList.forEach((todo, index) => { 
        listItems += `<li class="todo-item">${todo}
            <div>
                <span class="action-btn edit" onclick="editTodo(${index})";>
                    <i class="fas fa-pen"></i>
                </span>
                <span class="action-btn delete" onclick="deleteTodo(${index})";>
                    <i class="fas fa-trash"></i>
                </span>
            </div>
            </li>
            `
    })

    todoListElement.innerHTML = listItems

    todoInput.value = ""
}

function deleteTodo(index) {
    
        let dataFromLS = localStorage.getItem("new-todo")
        todoList = JSON.parse(dataFromLS)
        const removedTodo = todoList[index]
        todoList.splice(index, 1) //remove one todo
        alert(`removed new todo ${removedTodo}`)
        localStorage.setItem("new-todo", JSON.stringify(todoList))
        showTodos()       
}

function editTodo(index) {
    let editedValue = prompt('Edit todo:', todoList[index])
    let dataFromLS = localStorage.getItem("new-todo")
    todoList = JSON.parse(dataFromLS)
    todoList[index] = editedValue
    alert(`edited todo ${editedValue}`)
    localStorage.setItem("new-todo", JSON.stringify(todoList))
    showTodos()
}




