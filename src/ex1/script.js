// scope everything into the funcrions
const todoList = document.getElementById("todo-list");
const todosArray = ['Wash the dishes', 'Walk the dog', 'Water the flower', 'Feed the baby'];
const unsorted = 0;
const sortedAsc = 1;
const sortedDesc = 2;
let sorted = unsorted;
const inputTitle = document.getElementById("new-todo-title");

function addTodoText(todoText) {
  const listItem = document.createElement("li");
  listItem.className = "add-item-animation";
  setTimeout (() => {
    listItem.className = "existing-todo";
  }, 1000);

  listItem.innerHTML = `<div class="todo-text">${todoText}</div>
                  <button class="remove-todo-button"><i class="fa fa-trash"></i></button>`

  divElement = listItem.getElementsByTagName("div")[0];
  divElement.addEventListener('click', ({target}) => {
    onTodoClicked(target);
  });
  deleteButton = listItem.getElementsByTagName("button")[0]
  deleteButton.addEventListener('click', ({currentTarget}) => {
    onDeleteButtonClicked(currentTarget);
  });
  todoList.appendChild(listItem);
  sorted = unsorted;
}

todosArray.forEach(todoText => {
  addTodoText(todoText);
});


const amountInfo = document.getElementById("amount-info");

function amountOfTasksMessage() {

  let tasks = "tasks";
  if (todosArray.length === 1) {
    tasks = "task";
    document.getElementById('sort-list-button').style.display = "none";
    document.getElementById('clear-all-button').style.display = "none";
  } else {
    document.getElementById('sort-list-button').style.display = "";
    document.getElementById('clear-all-button').style.display = "";
  }
  amountInfo.textContent = `${todosArray.length} pending ${tasks}`;
  if (todosArray.length === 0) {
    document.getElementById('zero-todos-image').style.display = "block";
    document.getElementById('summary').style.display = "none";
  } else {
    document.getElementById('zero-todos-image').style.display = "none";
    document.getElementById('summary').style.display = "";
  }
}

amountOfTasksMessage();

function onTodoClicked(clickedTodo) {
  alert(clickedTodo.textContent);
}

function onDeleteButtonClicked(clickedButton) {
  const index = Array.prototype.indexOf.call(todoList.getElementsByTagName("li"), clickedButton.parentElement);
  todosArray.splice(index, 1);
  clickedButton.parentElement.classList.remove("existing-todo");
  clickedButton.parentElement.classList.add("delete-item-animation");
  setTimeout (() => {
    clickedButton.parentElement.remove();
    amountOfTasksMessage();
  }, 1000);
}

const clearAllButton = document.getElementById("clear-all-button");
clearAllButton.addEventListener('click', onClearAllButtonClicked);

function onClearAllButtonClicked() {
  const deleteButtons = todoList.querySelectorAll(".remove-todo-button");
  deleteButtons.forEach(button => {
    onDeleteButtonClicked(button);
  });
  todosArray.length = 0;
}

const addTodoForm = document.getElementById("add-todo");
addTodoForm.addEventListener('submit', onAddTodoFormSubmitted);

function onAddTodoFormSubmitted(event){
  event.preventDefault();
  const newTodoText = inputTitle.value;
  addTodoText(newTodoText);
  todosArray.push(newTodoText);
  amountOfTasksMessage();
  inputTitle.value = "";
}

inputTitle.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById('add-todo-button').click();
  }
});

const sortListButton = document.getElementById("sort-list-button");
sortListButton.addEventListener('click', onSortListButtonClicked);

function onSortListButtonClicked() {
  if (sorted === unsorted || sorted === sortedDesc) {
    sortListWithOrder(compareElementsAsc);
    sorted = sortedAsc;
  } else {
    sortListWithOrder(compareElementsDesc);
    sorted = sortedDesc;
  }
}

function sortListWithOrder(comparator) {
  let switching = true;
  let shouldSwitch = false;
  while (switching) {
    switching = false;
    const liElements = todoList.getElementsByTagName("li");
    for (i = 0; i < (liElements.length - 1); i++) {
      shouldSwitch = false;
      if (comparator(liElements[i].innerHTML.toLowerCase(), liElements[i + 1].innerHTML.toLowerCase())) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      liElements[i].parentNode.insertBefore(liElements[i + 1], liElements[i]);
      switching = true;
    }
  }
}

function compareElementsAsc(a, b) {
  return a > b;
}

function compareElementsDesc(a, b) {
  return a < b;
}
