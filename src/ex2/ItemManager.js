export default class ItemManager {
    constructor(){
        this.API_BASE = 'https://pokeapi.co/api/v2/pokemon/'
        this.todolist = []
        this.checkIfExistDataFromLS()//logic
    }

    /* showTodos() {
        this.showMatchUiByTodosNumber() //ui
        this.createTodoListItems() //ui
    } */

    addTodo(enterValue){
        
        if(enterValue.trim() === ""){
            alert("todo cannot be empty")
            return
        }
    
        //this.checkIfExistDataFromLS()
        this.pushEnteredDataToLS(enterValue)//logic
        //this.showTodos()//ui
    
        //addTodoButton.classList.remove("active")//ui
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

    /* showMatchUiByTodosNumber() {
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
    } */

    /* createTodoListItems() {
        let listItems = ""

        this.todoList.forEach((todo, index) => { 
            //  listItems += `<li>${todo}
            //     <span class="delete" onclick="deleteTodo(${index})";>
            //         <i class="fas fa-trash"></i>
            //     </span>
            //     </li>
            // `  
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
    } */

    deleteTodo(index) {
    
        let dataFromLS = localStorage.getItem("new-todo")
        this.todoList = JSON.parse(dataFromLS)
        const removedTodo = this.todoList[index]
        this.todoList.splice(index, 1) //remove one todo
        alert(`removed new todo ${removedTodo}`)
        localStorage.setItem("new-todo", JSON.stringify(this.todoList))
        //this.showTodos()       
    }
}
