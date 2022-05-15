const todoListElement = document.getElementById("todo-list")
const addTodoButton = document.getElementById("add-todo-button")
const todoInput = document.getElementById("todo-input")
const clearAllTodosButton = document.getElementById("clear-all-todos-button")
const sumTodos = document.getElementById("sum-todos")

let todoList = [] //array for storing data

showTodos()

todoInput.onkeyup = (e) => {
    let enterValue = todoInput.value
    if (enterValue.trim() !== ""){
        addTodoButton.classList.add("active")

        if(e.keyCode === 13){
            addTodo()
        }
    }
    else{
        addTodoButton.classList.remove("active")
        addTodoButton.style.opacity = 0.2
        addTodoButton.style.cursor = "not-allowed"
    }
}

addTodoButton.addEventListener("click", () => {
    addTodo()
})

function addTodo(){
    let enterValue = todoInput.value

    if(enterValue.trim() === ""){
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
    //add also something to empty state
    sumTodos.textContent = todoList.length
    if(todoList.length > 0){
        clearAllTodosButton.classList.add("active")
    }
    else{
        clearAllTodosButton.classList.remove("active")
    }
}

function createTodoListItems() {
    let listItems = ""

    todoList.forEach((todo, index) => { 
        listItems += `<li>${todo}<span class="delete" onclick="deleteTodo(${index})";><i class="fas fa-trash"></i></span></li>`
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
