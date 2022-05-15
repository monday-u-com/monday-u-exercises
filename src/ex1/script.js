//Selectors
const todoInput = document.getElementById("input-txt");
const todoButton = document.getElementById("add-btn");
const todoList = document.getElementById("list-element");
const clearAllBtn = document.getElementById("clearAll-btn");
const sortBtn = document.getElementById("sort-btn");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoInput.addEventListener("keyup" , todoEnter);
todoList.addEventListener("click" , deleteTask);

//Functions

function addTodo(event) {
    if (todoInput.value.trim() == 0){
        return alert("Error!")
    }
    event.preventDefault();
  //Todo li
  const todoLi = document.createElement("li");
  todoLi.classList.add("todo");
  todoLi.innerText = todoInput.value;

  //Add todo to local storage
  saveLocalTodos(todoInput.value);
  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i  class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoLi.appendChild(trashButton);
  //append to list
  todoList.appendChild(todoLi);
  //Clear Todo Input value
  todoInput.value = "";
}

function todoEnter(event){  
    if (event.keyCode == 13) {
       
    if (todoInput.value.trim() == 0){
        return alert("Error!")
    }
    addTodo(event);
       
      }
}

function deleteTask(e) {
    const item = e.target;
    if(item.classList[0] === "trash-btn"){
       const todo = item.parentElement;
       todo.classList.add("fall");
       removeLocalTodos(todo);
       setTimeout(function () {
        //delay the remove animation
        todo.remove();
      }, 500);
                
    }

}

function saveLocalTodos(todo){
    //Check if local storage is empty
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos() {
    //is the storage empty?
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo");
    todoLi.innerText = todo;

  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i  class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoLi.appendChild(trashButton);
  //append to list
  todoList.appendChild(todoLi);
  //Clear Todo Input value
  todoInput.value = "";
     }    );
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos" , JSON.stringify(todos));
   
}
