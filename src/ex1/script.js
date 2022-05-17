const todoList = document.getElementById("todo-list");
const todosArray = ['Wash the dishes', 'Walk the dog', 'Water the flower', 'Feed the baby'];

function addTodoText(todoText) {
  const listItem = document.createElement("li");

  const divTodo = document.createElement("div");
  divTodo.className = "todo-text";
  divTodo.appendChild(document.createTextNode(todoText));
  divTodo.addEventListener('click', ({target}) => {
    onTodoClicked(target);
  });
  listItem.appendChild(divTodo);

  const deleteButton = document.createElement("button");
  deleteButton.className = "remove-todo-button";
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa fa-trash";
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener('click', ({currentTarget}) => {
    onDeleteButtonClicked(currentTarget);
  });
  listItem.appendChild(deleteButton);

  todoList.appendChild(listItem);
}

todosArray.forEach(todoText => {
  addTodoText(todoText);
});


const amountInfo = document.getElementById("amount-info");

function amountOfTasksMessage() {
  let tasks = "tasks";
  if (todosArray.length === 1) {
    tasks = "task";
  }
  amountInfo.textContent = `You have ${todosArray.length} pending ${tasks}`;
}

amountOfTasksMessage();


function onTodoClicked(clickedTodo) {
  alert(clickedTodo.textContent);
}

function onDeleteButtonClicked(clickedButton) {
  const index = Array.prototype.indexOf.call(todoList.getElementsByTagName("li"), clickedButton.parentElement);
  todosArray.splice(index, 1);
  clickedButton.parentElement.remove();
  amountOfTasksMessage();
}

const clearAllButton = document.getElementById("clear-all-button");
clearAllButton.addEventListener('click', onClearAllButtonClicked);

function onClearAllButtonClicked() {
  todoList.innerHTML = "";
  todosArray.length = 0;
  amountOfTasksMessage();
}

function addNewTodo(){
  const newTodoText = document.getElementById("new-todo").value;
  if (newTodoText.length < 4) {
    alert('Please use at least 4 characters for each todo')
  } else {
    addTodoText(newTodoText);
    todosArray.push(newTodoText);
    amountOfTasksMessage();
    document.getElementById("new-todo").value = "";
  }
}

const input = document.getElementById("new-todo");
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addNewTodo();
  }
});
