/*
Install http-server by typing npm install -g http-server
Change into your working directory, where your some.html lives
Start your http server by issuing http-server -c-1
*/

import { ItemManager } from "/item-manager.js";
import { PokemonClient } from "/pokemon-client.js";

const SHOW = true;
const HIDE = false;

class Main {
  constructor(itemManager, pokemonClient) {
    this.itemManager = itemManager;
    this.pokemonClient = pokemonClient;
  }

  init() {
    this.todoList = document.getElementById("todos-list");
    this.todoTextBox = document.getElementById("new-todo-textbox");
    this.todoAmountInfo = document.getElementById("amount-info");

    this.clearAllButton = document.getElementById("clear-all-button");
    this.addTodoForm = document.getElementById("add-todo");
    this.sortListButton = document.getElementById("sort-list-button");

    this.clearAllButton.addEventListener('click', () => this.onClearAllButtonClicked());
    this.addTodoForm.addEventListener('submit', (event) => this.onAddTodoFormSubmitted(event));
    this.sortListButton.addEventListener('click', () => this.onSortListButtonClicked());
    this.todoTextBox.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById('add-todo-button').click();
      }
    });

    this.updateTodos(itemManager.init());
  }

  renderTodos() {
    this.todoList.innerHTML = "";
    this.todos.forEach(todoItem => {
      this.addTodoItem(todoItem);
    });
    this.showFooterAndImage();
  }

  addTodoItem(todoItem) {
    const listItem = this.createTodoListElement(todoItem);
    this.addEventListenerForTodoText(listItem);
    this.addEventListenerForDeleteButton(listItem);
    this.todoList.appendChild(listItem);
  }

  createTodoListElement(todoItem) {
    const todoListElement = document.createElement("li");
    todoListElement.className = "todo-li existing-todo";
    if (todoItem.isNew) {
      this.showTodoWithAnimation(todoListElement, todoItem);
    }
    todoListElement.innerHTML = `<div class="todo-text">${todoItem.text}</div>
                                <button class="delete-todo-button btn"><i class="fa fa-trash"></i></button>`;
    return todoListElement;
  }

  showTodoWithAnimation(todoListElement, todoItem) {
    todoListElement.className = "todo-li animation-add-todo";
    setTimeout (() => { todoListElement.className = "todo-li existing-todo";}, 700);
    this.itemManager.markItemAsOld(todoItem);
  }

  addEventListenerForTodoText(listElement) {
    const todoText = listElement.getElementsByClassName("todo-text")[0];
    todoText.addEventListener('click', ({target}) => {
      this.onTodoTextClicked(target);
    });
  }

  addEventListenerForDeleteButton(listItem) {
    const deleteButton = listItem.getElementsByClassName("delete-todo-button")[0];
    deleteButton.addEventListener('click', ({currentTarget}) => {
      this.onDeleteButtonClicked(currentTarget);
    });
  }

  showFooterAndImage() {
    this.showButtonsAndAmount();
    this.showNoTodosImage();
  }

  showButtonsAndAmount() {
    let tasks = "tasks";
    if (this.todos.length === 1) {
      tasks = "task";
      this.showOrHideElement('sort-list-button', HIDE)
      this.showOrHideElement('clear-all-button', HIDE)
    } else {
      this.showOrHideElement('sort-list-button', SHOW)
      this.showOrHideElement('clear-all-button', SHOW)
    }
    this.todoAmountInfo.textContent = `${this.todos.length} pending ${tasks}`;
  }

  showNoTodosImage() {
    if (this.todos.length === 0) {
      this.showOrHideElement('no-todos-placeholder', SHOW)
      this.showOrHideElement('footer', HIDE)
    } else {
      this.showOrHideElement('no-todos-placeholder', HIDE)
      this.showOrHideElement('footer', SHOW)
    }
  }

  showOrHideElement(elementId, showElement) {
    this.displayStyle = showElement ? "" : "none";
    document.getElementById(elementId).style.display = this.displayStyle;
  }

  onTodoTextClicked(clickedTodo) {
    alert(clickedTodo.textContent);
  }

  onDeleteButtonClicked(clickedButton) {
    const index = Array.prototype.indexOf.call(this.todoList.getElementsByClassName("existing-todo"), clickedButton.parentElement);
    const todoLi = clickedButton.parentElement;
    this.deleteToDoTaskWithAnimation(index, todoLi);
   }

  deleteToDoTaskWithAnimation(index, todoLi) {
    todoLi.classList.remove("existing-todo");
    todoLi.classList.add("animation-delete-todo");
    setTimeout (() => {
      this.deleteTodoTask(index);
    }, 700);
  }

  deleteTodoTask(index) {
    this.updateTodos(this.itemManager.deleteItem(index));
  }

  updateTodos(updatedArray) {
    this.todos = updatedArray;
    this.renderTodos();
  }

  onClearAllButtonClicked() {
    const deleteButtons = Array.prototype.slice.call(document.getElementsByClassName("delete-todo-button"));
    deleteButtons.reverse().forEach(button => {
      this.onDeleteButtonClicked(button);
    });
  }

  onAddTodoFormSubmitted(event) {
    event.preventDefault();
    const text = this.todoTextBox.value;
    this.todoTextBox.value = "";
    if (this.pokemonClient.isPokemon(text)) {
      this.addPokemon(text.toLowerCase());
    } else {
      const isTextNaN = text.split(',').map( el => isNaN(el));
      if (isTextNaN.includes(true)) {
        this.updateTodos(itemManager.addItem(text))
      } else {
        this.addPokemon(text);
      }
    }
  }

  addPokemon(text) {
    this.pokemonClient.fetchPokemon(text).then(pokemons => {
      let updatedTodos;
      try {
        pokemons.forEach(pokemon => {
          updatedTodos = itemManager.addItem(`Catch ${pokemon}`);
        })
      } catch (error) {
        updatedTodos = itemManager.addItem(`Failed to fetch ${text}`);
      }
      this.updateTodos(updatedTodos);
    })
  }

  onSortListButtonClicked() {
    this.updateTodos(this.itemManager.sortItems());
  }
}

const itemManager = new ItemManager();
const pokemonClient = new PokemonClient();
const main = new Main(itemManager, pokemonClient);

document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    main.init();
});
