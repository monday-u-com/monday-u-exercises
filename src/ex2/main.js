/*
Install http-server by typing npm install -g http-server
Change into your working directory, where your some.html lives
Start your http server by issuing http-server -c-1
*/

import { ItemManager } from "/item-manager.js";
import { PokemonClient } from "/pokemon-client.js";

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
    this.displayFooterAndImage();
  }

  addEventListenerForTodoTitle(listItem) {
    const todoTitleDiv = listItem.getElementsByClassName("todo-text")[0];
    todoTitleDiv.addEventListener('click', ({target}) => {
      this.onTodoTitleClicked(target);
    });
  }

  addEventListenerForDeleteButton(listItem) {
    const deleteButton = listItem.getElementsByClassName("remove-todo-button")[0]
    deleteButton.addEventListener('click', ({currentTarget}) => {
      this.onDeleteButtonClicked(currentTarget);
    });
  }

  addTodoItem(todoItem) {
    const listItem = this.createListElement(todoItem);
    this.addEventListenerForTodoTitle(listItem);
    this.addEventListenerForDeleteButton(listItem);
    this.todoList.appendChild(listItem);
  }

  createListElement(todoItem) {
    const listItem = document.createElement("li");
    listItem.className = "existing-item";
    if (todoItem.isNew) {
      listItem.className = "add-item-animation";
      setTimeout (() => { listItem.className = "existing-item";}, 700);
      this.itemManager.markItemAsOld(todoItem);
    }
    listItem.innerHTML = `<div class="todo-text">${todoItem.text}</div>
                          <button class="remove-todo-button"><i class="fa fa-trash"></i></button>`;
    return listItem;
  }

  displayFooterAndImage() {
    this.displayButtonsAndAmount();
    this.displayZeroImage();
  }

  displayButtonsAndAmount() {
    let tasks = "tasks";
    if (this.todos.length === 1) {
      tasks = "task";
      this.displayElement('sort-list-button', false)
      this.displayElement('clear-all-button', false)
    } else {
      this.displayElement('sort-list-button', true)
      this.displayElement('clear-all-button', true)
    }
    this.todoAmountInfo.textContent = `${this.todos.length} pending ${tasks}`;
  }

  displayZeroImage() {
    if (this.todos.length === 0) {
      this.displayElement('no-todos-placeholder', true)
      this.displayElement('footer', false)
    } else {
      this.displayElement('no-todos-placeholder', false)
      this.displayElement('footer', true)
    }
  }

  displayElement(elementId, toDisplay) {
    this.displayStyle = toDisplay ? "" : "none";
    document.getElementById(elementId).style.display = this.displayStyle;
  }

  onTodoTitleClicked(clickedTodo) {
    alert(clickedTodo.textContent);
  }

  onDeleteButtonClicked(clickedButton) {
    const index = Array.prototype.indexOf.call(this.todoList.getElementsByTagName("li"), clickedButton.parentElement);
    clickedButton.parentElement.classList.remove("existing-item");
    clickedButton.parentElement.classList.add("delete-item-animation");
    setTimeout (() => {
      this.updateTodos(this.itemManager.deleteItem(index));
    }, 700);
  }

  onClearAllButtonClicked() {
    const deleteButtons = Array.prototype.slice.call(document.querySelectorAll("div"));
    deleteButtons.reverse().forEach(button => {
      this.onDeleteButtonClicked(button);
    });
  }

  onAddTodoFormSubmitted(event) {
    event.preventDefault();
    const newTodoText = this.todoTextBox.value;
    this.todoTextBox.value = "";
    if (this.pokemonClient.isPokemon(newTodoText)) {
      this.addPokemon(newTodoText.toLowerCase());
    } else {
      const isNaNArray = newTodoText.split(',').map( el => isNaN(el));
      if (isNaNArray.includes(true)) {
        this.updateTodos(itemManager.addItem(newTodoText))
      } else {
        this.addPokemon(newTodoText);
      }
    }
  }

  addPokemon(newTodoText) {
    this.pokemonClient.fetchPokemon(newTodoText).then(pokemons => {
      let updatedArray;
      try {
        pokemons.forEach(pokemon => {
          updatedArray = itemManager.addItem(`Catch ${pokemon}`);
        })
      } catch (error) {
        updatedArray = itemManager.addItem(`Failed to fetch ${newTodoText}`);
      }
      this.updateTodos(updatedArray);
    })
  }

  onSortListButtonClicked() {
    this.updateTodos(this.itemManager.sortItems());
  }

  updateTodos(updatedArray) {
    this.todos = updatedArray;
    this.renderTodos();
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
