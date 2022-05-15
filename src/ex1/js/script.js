const ENTER_KEY_CODE = 13;

// messages
const EMPTY_INPUT_MESSAGE = "Empty input!";
const DELETE_CONFIRMATION_MESSAGE = "Are you sure?";

// selectors
const todoInput = document.querySelector(".todo__input");
const addBtn = document.querySelector(".todo__add");
const todoList = document.querySelector(".todo__list");
const pendingAmountLabel = document.getElementById("todo__pending-amount");
const clearBtn = document.querySelector(".todo__clear");

// listeners
todoInput.addEventListener("keydown", handleKeyDownPress);
addBtn.addEventListener("click", handleAddBtnPress);
clearBtn.addEventListener("click", handleRemoveAll);

// var
let pendingAmount = todoList.childNodes.length;

// handlers
function handleAddBtnPress() {
  isValidInput() ? handleAddItem() : alert(EMPTY_INPUT_MESSAGE);
}

function handleKeyDownPress({ keyCode }) {
  if (keyCode === ENTER_KEY_CODE)
    isValidInput() ? handleAddItem() : alert(EMPTY_INPUT_MESSAGE);
}

function handleAddItem() {
  const todoItem = createTodoItem();
  todoList.appendChild(todoItem);
  todoInput.value = ""; // reset input
  updatePendingAmountLabel(++pendingAmount);
}

function handleLabelPress(itemId) {
  const item = document.getElementById(itemId);
  alert(item.innerText);
}

function handleRemoveItem(itemId) {
  const item = document.getElementById(itemId);
  if (confirm(DELETE_CONFIRMATION_MESSAGE)) {
    todoList.removeChild(item);
    updatePendingAmountLabel(--pendingAmount);
  }
}

function handleRemoveAll() {
  if (pendingAmount) {
    todoList.replaceChildren();
    pendingAmount = 0;
    updatePendingAmountLabel(pendingAmount);
  }
}

// utils
function isValidInput() {
  return todoInput.value.trim();
}

function createElement(element, classNames = "") {
  const newElement = document.createElement(element);
  newElement.className = classNames;
  return newElement;
}

function createTodoItem() {
  // li
  const item = createElement("li", "todo__item");
  item.id = Math.random().toString(16);
  // label
  const label = createElement("label", "todo__label");
  label.innerText = todoInput.value;
  label.addEventListener("click", () => handleLabelPress(item.id));
  // delete
  const deleteBtn = createElement("button", "todo__delete");
  deleteBtn.addEventListener("click", () => handleRemoveItem(item.id));
  const trashIcon = createElement("i", "fas fa-trash");
  deleteBtn.appendChild(trashIcon);
  // append
  item.append(label, deleteBtn);
  return item;
}

function updatePendingAmountLabel(amount) {
  pendingAmountLabel.innerText = amount;
}
