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
        setDataToLS(todoList)
        showTodos()
    })

    orderSelect.addEventListener('change', (e) => {
        
        todoList = retriveDataFromLS()
    
        if(e.target.value === "A-Z") {
            todoList = [...todoList.sort()]
        }
        else{
            todoList = [...todoList.sort().reverse()]
        }
    
        setDataToLS(todoList)
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

    todoList = retriveDataFromLS()
    pushEnteredDataToLS(trim(enterValue))
    showTodos()

    addTodoButton.classList.remove("active")
}

function retriveDataFromLS() {
    const dataFromLS = localStorage.getItem("new-todo")
    return JSON.parse(dataFromLS)
}

function setDataToLS(todoList) {
    localStorage.setItem("new-todo", JSON.stringify(todoList))
}

function checkDataFromLS(){
    let dataFromLS = localStorage.getItem("new-todo")
    let copyTodoList = []

    if(dataFromLS === null){
        copyTodoList = []
    }
    else{
        copyTodoList = JSON.parse(dataFromLS)
    }

    return copyTodoList
}

function pushEnteredDataToLS(enterValue){
    todoList.push(enterValue)
    setDataToLS(todoList)
    alert(`added new todo ${enterValue}`)
}

function showTodos() {
    todoList = checkDataFromLS()
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
                <span class="action-btn edit">
                    <i class="fas fa-pen"></i>
                </span>
                <span class="action-btn delete">
                    <i class="fas fa-trash"></i>
                </span>
            </div>
            </li>
            `
    })

    todoListElement.innerHTML = listItems

    createDeleteAndEditEvents()
    todoInput.value = ""
}

function createDeleteAndEditEvents() {
    const deleteItems = document.querySelectorAll(".delete")
    const editItems = document.querySelectorAll(".edit")

    for (let i = 0; i < deleteItems.length; i++) {
        deleteItems[i].addEventListener("click", () => this.deleteTodo(i))
    }

    for (let i = 0; i < editItems.length; i++) {
        editItems[i].addEventListener("click", () => this.editTodo(i))
    }
}

function deleteTodo(index) {
    
        todoList = retriveDataFromLS()
        const removedTodo = todoList[index]
        todoList = deletItemFromList(index) //remove one todo
        alert(`removed new todo ${removedTodo}`)
        setDataToLS(todoList)
        showTodos()       
}

function deletItemFromList(index) {
    let copyTodoList = todoList
    copyTodoList.splice(index, 1)
    return copyTodoList
}

function editTodo(index) {
    let editedValue = prompt('Edit todo:', todoList[index])
    
    if(editedValue === null ){
        return
    }

    todoList = retriveDataFromLS()
    todoList = editItemFromList(index, editedValue)
    alert(`edited todo ${editedValue}`)
    setDataToLS(todoList)
    showTodos()
}

function editItemFromList(index ,editedValue) {
    let copyTodoList = todoList
    copyTodoList[index] = editedValue
    return copyTodoList
}

function trim(value) {
    return value.replace(/^\s+|\s+$/g,"");
}




