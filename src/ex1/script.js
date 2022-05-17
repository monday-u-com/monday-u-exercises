const todoList = document.getElementsByClassName("todo-list")[0];
const todosArray = ['one', 'two', 'three', 'four', 'five'];

todoList.innerHTML = "";
todosArray.forEach(todoText => {
  const listItem = document.createElement("li");

  const divTodo = document.createElement("div");
  divTodo.className = "todo-text";
  divTodo.appendChild(document.createTextNode(todoText));
  listItem.appendChild(divTodo);

  const deleteButton = document.createElement("button");
  deleteButton.className = "remove-todo-button";
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa fa-trash";
  deleteButton.appendChild(deleteIcon);
  listItem.appendChild(deleteButton);

  todoList.appendChild(listItem);
});

const todos = document.querySelectorAll(".todo-text");
const deleteButtons = document.querySelectorAll(".todo-list .remove-todo-button");
const clearAllButton = document.getElementById("clear-all-button");
const amountInfo = document.getElementById("amount-info");

function amountOfTasksMessage() {
  let tasks = "tasks";
  if (todosArray.length === 1) {
    tasks = "task";
  }
  amountInfo.textContent = `You have ${todosArray.length} pending ${tasks}`;
}

amountOfTasksMessage();

todos.forEach (todo => {
  todo.addEventListener('click', ({target}) => {
    onTodoClicked(target);
  });
});

function onTodoClicked(clickedTodo) {
  alert(clickedTodo.textContent);
}

deleteButtons.forEach (deleteButton => {
  deleteButton.addEventListener('click', ({currentTarget}) => {
    onDeleteButtonClicked(currentTarget);
  });
});

function onDeleteButtonClicked(clickedButton) {
  // alert(`Do you want to delete "${clickedButton.previousElementSibling.textContent}"?`);
  const index = Array.prototype.indexOf.call(todoList.childNodes, clickedButton.parentElement);
  todosArray.splice(index, 1);
  clickedButton.parentElement.remove();
  amountOfTasksMessage();
}

clearAllButton.addEventListener('click', onClearAllButtonClicked);

function onClearAllButtonClicked() {
  todoList.innerHTML = "";
  todosArray.length = 0;
  amountOfTasksMessage();
}
