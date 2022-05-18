const allTodosList = document.getElementById("all-todos-list");

const unsorted = 0;
const sortedAsc = 1;
const sortedDesc = 2;
let isListSorted = unsorted;

const todosArray = ['Wash the dishes', 'Walk the dog', 'Water the flower', 'Feed the baby'];
const inputTitle = document.getElementById("new-todo-title");
const amountInfo = document.getElementById("amount-info");

todosArray.forEach(todoText => {
  addTodoItem(todoText, false);
  displayFooter();
});

function addTodoItem(todoText, animation) {
  const listItem = createListElement(todoText, animation);
  addEventListenerForTodoTitle(listItem);
  addEventListenerForDeleteButton(listItem);
  allTodosList.appendChild(listItem);
  isListSorted = unsorted;
}

function createListElement(todoText, animation) {
  const listItem = document.createElement("li");
  if (animation) listItem.className = "add-item-animation";
  setTimeout (() => { listItem.className = "existing-item";}, 1000);
  listItem.innerHTML = `<div class="todo-text">${todoText}</div>
                        <button class="remove-todo-button"><i class="fa fa-trash"></i></button>`;
  return listItem;
}

function addEventListenerForTodoTitle(listItem) {
  const todoTitleDiv = listItem.getElementsByTagName("div")[0];
  todoTitleDiv.addEventListener('click', ({target}) => {
    onTodoTitleClicked(target);
  });
}

function addEventListenerForDeleteButton(listItem) {
  const deleteButton = listItem.getElementsByTagName("button")[0]
  deleteButton.addEventListener('click', ({currentTarget}) => {
    onDeleteButtonClicked(currentTarget);
  });
}

function displayFooter() {
  displayButtonsAndAmount();
  displayZeroImage();
}

function displayButtonsAndAmount() {
  let tasks = "tasks";
  if (todosArray.length === 1) {
    tasks = "task";
    displayElement('sort-list-button', false)
    displayElement('clear-all-button', false)
  } else {
    displayElement('sort-list-button', true)
    displayElement('clear-all-button', true)
  }
  amountInfo.textContent = `${todosArray.length} pending ${tasks}`;
}

function displayZeroImage() {
  if (todosArray.length === 0) {
    displayElement('zero-todos-image', true)
    displayElement('footer', false)
  } else {
    displayElement('zero-todos-image', false)
    displayElement('footer', true)
  }
}

function displayElement(ElementId, toDisplay) {
  displayStyle = toDisplay? "" : "none";
  document.getElementById(ElementId).style.display = displayStyle;
}

function onTodoTitleClicked(clickedTodo) {
  alert(clickedTodo.textContent);
}

function onDeleteButtonClicked(clickedButton) {
  const index = Array.prototype.indexOf.call(allTodosList.getElementsByTagName("li"), clickedButton.parentElement);
  todosArray.splice(index, 1);
  clickedButton.parentElement.classList.remove("existing-item");
  clickedButton.parentElement.classList.add("delete-item-animation");
  setTimeout (() => {
    clickedButton.parentElement.remove();
    displayFooter();
  }, 1000);
}

const clearAllButton = document.getElementById("clear-all-button");
clearAllButton.addEventListener('click', onClearAllButtonClicked);

function onClearAllButtonClicked() {
  const deleteButtons = Array.prototype.slice.call(document.querySelectorAll("div"));
  deleteButtons.reverse().forEach(button => {
    onDeleteButtonClicked(button);
  });
}

const addTodoForm = document.getElementById("add-todo");
addTodoForm.addEventListener('submit', onAddTodoFormSubmitted);

function onAddTodoFormSubmitted(event){
  event.preventDefault();
  const newTodoText = inputTitle.value;
  addTodoItem(newTodoText, true);
  todosArray.push(newTodoText);
  displayFooter();
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
  if (isListSorted === unsorted || isListSorted === sortedDesc) {
    sortListWithOrder(compareElementsAsc);
    isListSorted = sortedAsc;
  } else {
    sortListWithOrder(compareElementsDesc);
    isListSorted = sortedDesc;
  }
}

function sortListWithOrder(comparator) {
  let switching = true;
  let shouldSwitch = false;
  while (switching) {
    switching = false;
    const liElements = allTodosList.getElementsByTagName("li");
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
