
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
        this.showMatchUiByTodosNumber() //ui
        this.createTodoListItems() //ui
    }

    showMatchUiByTodosNumber() {
        sumTodos.textContent = this.itemManager.todoList.length
        
        if(this.itemManager.todoList.length > 0){
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

        this.itemManager.todoList.forEach((todo, index) => { 
            listItems += `<li>${todo}
                <span class="delete";>
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

    deleteTodo(index){
        this.itemManager.deleteTodo(index)
        this.showTodos()
    }

    addTodo(){
        let enterValue = todoInput.value
        this.itemManager.addTodo(enterValue)
        addTodoButton.classList.remove("active")
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
