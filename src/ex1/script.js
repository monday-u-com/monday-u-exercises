
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const deleteAllBtn = document.querySelector(".footer button");
const item = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", getTasks);
todoButton.addEventListener("click", addTask);
todoList.addEventListener("click", deleteTask);
deleteAllBtn.addEventListener("click", deleteAll);
item.addEventListener("click", taskClick);


function addTask(e) {
  let todos;
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  e.preventDefault();
  if (todoInput.value !== '') {
    let mySound = new Audio('sounds/success.mp3')
    mySound.play()
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    saveLocalTasks(todoInput.value);

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todos = JSON.parse(localStorage.getItem("todos"));
    pendingTasksNumb.textContent = todos.length;
  } 
  else {
    alert ('An empty task cannot be entered')
  }

}

function deleteTask(e) {
  const item = e.target;
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  if (item.classList[0] === "trash-btn") {
    let mySound = new Audio('sounds/failure.mp3')
    mySound.play()
    const todo = item.parentElement;
    todo.classList.add("fall");

    removeLocalTasks(todo);
    todo.addEventListener("transitionend", e => {
    todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function saveLocalTasks(todo) {
  let todos;
  if (localStorage.getItem("todos") === []) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTasks(todo) {
  let todos;
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  pendingTasksNumb.textContent = todos.length;

}

function getTasks() {
  let todos;
  if (localStorage.getItem("todos") === null || localStorage.getItem("todos") === []) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = todos.length;

  if(todos.length > 0){ 
    deleteAllBtn.classList.add("active");
  }else{
    deleteAllBtn.classList.remove("active");
  }
  todos.forEach(function(todo) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";

  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
});
  if (todos.length == 0) {
  todoList.innerHTML = '';
  }
}

function deleteAll() {
  todos = []; 
  localStorage.setItem("todos", JSON.stringify(todos)); 
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = todos.length;
  getTasks(); 
}

function taskClick(todo) {
  const item = todo.target;
  if (item.constructor.name === 'HTMLLIElement') {
    alert(item.innerText);
  }
}