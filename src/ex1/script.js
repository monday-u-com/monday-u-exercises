const allTodosList = document.getElementById("all-todos-list");

const UNSORTED = 0;
const SORTED_ASC = 1;
const SORTED_DESC = 2;
let isListSorted = UNSORTED;

const SHOW = true;
const HIDE = false;

const todosArray = ['Wash the dishes', 'Walk the dog', 'Water the flower', 'Feed the baby'];
const inputTitle = document.getElementById("new-todo-title");
const amountOfTodosInfo = document.getElementById("amount-info");

const clearAllButton = document.getElementById("clear-all-button");
const addTodoForm = document.getElementById("add-todo");
const sortListButton = document.getElementById("sort-list-button");

clearAllButton.addEventListener('click', onClearAllButtonClicked);
addTodoForm.addEventListener('submit', onAddTodoFormSubmitted);
sortListButton.addEventListener('click', onSortListButtonClicked);

todosArray.forEach(todoText => {
  addTodoItem(todoText, HIDE);
});
showOrHideFooterAndImage();

function addEventListenerForTodoTitle(listItem) {
  const todoTitleDiv = listItem.getElementsByClassName("todo-text")[0]
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

function addTodoItem(todoText, animation) {
  const listItem = createListElement(todoText, animation);
  addEventListenerForTodoTitle(listItem);
  addEventListenerForDeleteButton(listItem);
  allTodosList.appendChild(listItem);
  isListSorted = UNSORTED;
}

function createListElement(todoText, animation) {
  const listItem = document.createElement("li");
  listItem.className = "todo-li existing-item";
  if (animation) {
    showItemWithAnimation(listItem);
  }
  listItem.innerHTML = `<div class="todo-text">${todoText}</div>
                        <button class="remove-todo-button btn"><i class="fa fa-trash"></i></button>`;
  return listItem;
}
function showItemWithAnimation(listItem) {
  listItem.className = "todo-li add-item-animation";
  setTimeout (() => { listItem.className = "todo-li existing-item";}, 700);
}

function showOrHideFooterAndImage() {
  showOrHideButtonsAndAmount();
  showOrHideZeroImage();
}

function showOrHideButtonsAndAmount() {
  let tasks = "tasks";
  if (todosArray.length === 1) {
    tasks = "task";
    showOrHideElement('sort-list-button', HIDE)
    showOrHideElement('clear-all-button', HIDE)
  } else {
    showOrHideElement('sort-list-button', SHOW)
    showOrHideElement('clear-all-button', SHOW)
  }
  amountOfTodosInfo.textContent = `${todosArray.length} pending ${tasks}`;
}

function showOrHideZeroImage() {
  if (todosArray.length === 0) {
    showOrHideElement('zero-todos-image', SHOW)
    showOrHideElement('footer', HIDE)
  } else {
    showOrHideElement('zero-todos-image', HIDE)
    showOrHideElement('footer', SHOW)
  }
}

function showOrHideElement(elementId, toShow) {
  displayStyle = toShow ? "" : "none";
  document.getElementById(elementId).style.display = displayStyle;
}

function onTodoTitleClicked(clickedTodo) {
  alert(clickedTodo.textContent);
}

function onDeleteButtonClicked(clickedButton) {
  const index = Array.prototype.indexOf.call(allTodosList.getElementsByTagName("li"), clickedButton.parentElement);
  const todoLi = clickedButton.parentElement;
  deleteToDoTaskWithAnimation(index, todoLi);
 }

function deleteToDoTaskWithAnimation(index, todoLi) {
  todoLi.classList.remove("existing-item");
  todoLi.classList.add("delete-item-animation");
  setTimeout (() => {
    deleteTodoTask(index, todoLi);
  }, 700);
}

function deleteTodoTask(index, todoLi) {
  todosArray.splice(index, 1);
  todoLi.remove();
  showOrHideFooterAndImage();
}

function onClearAllButtonClicked() {
  const deleteButtons = Array.prototype.slice.call(document.getElementsByClassName("remove-todo-button"));
  deleteButtons.reverse().forEach(button => {
    onDeleteButtonClicked(button);
  });
}

function onAddTodoFormSubmitted(event){
  event.preventDefault();
  const newTodoText = inputTitle.value;
  addTodoItem(newTodoText, SHOW);
  todosArray.push(newTodoText);
  showOrHideFooterAndImage();
  inputTitle.value = "";
}

inputTitle.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById('add-todo-button').click();
  }
});

function onSortListButtonClicked() {
  if (isListSorted === UNSORTED || isListSorted === SORTED_DESC) {
    sortListWithOrder(compareElementsAsc);
    isListSorted = SORTED_ASC;
  } else {
    sortListWithOrder(compareElementsDesc);
    isListSorted = SORTED_DESC;
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
