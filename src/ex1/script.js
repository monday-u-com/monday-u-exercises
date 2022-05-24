const userInput = document.querySelector(".userinput");
const userList = document.querySelector(".userlist");
const taskBtn = document.querySelector(".todobutton");
const item = document.querySelector(".userlist");
const deleteAllBtn = document.querySelector(".footer button");

document.addEventListener("DOMContentLoaded", getTasks);
taskBtn.addEventListener("click", addTask);
userList.addEventListener("click", deleteTask);
deleteAllBtn.addEventListener("click", deleteAll);
item.addEventListener("click", taskClick);


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
}

function deleteAll() {
  todos = []; 
  localStorage.setItem("todos", JSON.stringify(todos)); 
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = todos.length;
  getTasks(); 
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

function addTask() {
  let todos;
  const pendingTasksNumb = document.querySelector(".pendingTasks");

  if (userInput.value !== '') {
    let mySound = new Audio('sounds/success.mp3')
    mySound.play()

    const frame = document.createElement("div");
    frame.classList.add("todo");

    const task = document.createElement("li");
    task.innerText = userInput.value;
    saveLocalTasks(userInput.value);

    task.classList.add("todo-item");
    frame.appendChild(task);
    userInput.value = "";

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    frame.appendChild(trashButton);

    userList.appendChild(frame);
    todos = JSON.parse(localStorage.getItem("todos"));
    pendingTasksNumb.textContent = todos.length;
  } 
  else {
    alert ('An empty task cannot be entered')
  }
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
  userInput.value = "";

  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  userList.appendChild(todoDiv);
});
  if (todos.length == 0) {
  userList.innerHTML = '';
  }
}

function taskClick(todo) {
  const item = todo.target;
  if (item.constructor.name === 'HTMLLIElement') {
    alert(item.innerText);
  }
}