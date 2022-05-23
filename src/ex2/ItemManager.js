const todoListElement = document.getElementById("todo-list")
const addTodoButton = document.getElementById("add-todo-button")
const todoInput = document.getElementById("todo-input")
const clearAllTodosButton = document.getElementById("clear-all-todos-button")
const sumTodos = document.getElementById("sum-todos")
const orderSelect = document.getElementById("order-select")
const enterTodos = document.getElementById("enter-todos")

class ItemManager {
    constructor(){
        this.API_BASE = 'https://pokeapi.co/api/v2/pokemon/'
        this.todolist = []
        //this.deleteTodo = this.deleteTodo.bind(this)
    }

    showTodos() {
        this.checkIfExistDataFromLS()
        this.showMatchUiByTodosNumber()
        this.createTodoListItems()
    }

    addTodo(){
        let enterValue = todoInput.value
    
        if(enterValue.trim() === ""){
            alert("todo cannot be empty")
            return
        }
    
        this.checkIfExistDataFromLS()
        this.pushEnteredDataToLS(enterValue)
        this.showTodos()
    
        addTodoButton.classList.remove("active")
    }

    checkIfExistDataFromLS(){
        let dataFromLS = localStorage.getItem("new-todo")
    
        if(dataFromLS === null){
            this.todoList = []
        }
        else{
            this.todoList = JSON.parse(dataFromLS)
        }
    }

    pushEnteredDataToLS(enterValue){
        this.todoList.push(enterValue)
        localStorage.setItem("new-todo", JSON.stringify(this.todoList))
        alert(`added new todo ${enterValue}`)
    }

    showMatchUiByTodosNumber() {
        sumTodos.textContent = this.todoList.length
        
        if(this.todoList.length > 0){
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

    createTodoListItems() {
        let listItems = ""

        this.todoList.forEach((todo, index) => { 
            /* listItems += `<li>${todo}
                <span class="delete" onclick="deleteTodo(${index})";>
                    <i class="fas fa-trash"></i>
                </span>
                </li>
            `  */
            listItems += `<li>${todo}
                <span class="delete"";>
                    <i class="fas fa-trash"></i>
                </span>
                </li>
            `
        })
    
        todoListElement.innerHTML = listItems
        
        const func = document.querySelectorAll(".delete")
        for (let i = 0; i < func.length; i++) {
            func[i].addEventListener("click", () => this.deleteTodo(i))
        }
        

        todoInput.value = ""
    }

    deleteTodo(index) {
    
        let dataFromLS = localStorage.getItem("new-todo")
        this.todoList = JSON.parse(dataFromLS)
        const removedTodo = this.todoList[index]
        this.todoList.splice(index, 1) //remove one todo
        alert(`removed new todo ${removedTodo}`)
        localStorage.setItem("new-todo", JSON.stringify(this.todoList))
        this.showTodos()       
    }
}

const itemManager = new ItemManager();

itemManager.showTodos()


todoInput.onkeyup = (e) => {
    let enterValue = todoInput.value
    if (enterValue.trim() !== ""){
        addTodoButton.classList.add("active")
        addTodoButton.style.cursor = "pointer"
        addTodoButton.style.opacity = 1

        if(e.keyCode === 13){
            itemManager.addTodo()
        }
    }
    else{
        addTodoButton.classList.remove("active")
        addTodoButton.style.opacity = 0.2
        addTodoButton.style.cursor = "not-allowed"
    }
}

addTodoButton.addEventListener("click", () => {
    itemManager.addTodo()
})