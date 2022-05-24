// Implement the `Main` class here

import { ItemManager } from './ItemManager.js';

class Main {
  constructor(itemManager, listEl, inputEl, addButtonEl) {
    this.itemManager = itemManager;
    this.listEl = listEl;
    this.inputEl = inputEl;
    this.addButtonEl = addButtonEl;
  }

  async addTaskHandler() {
    const inputValue = this.inputEl.value.trim();
    if (!inputValue) {
      alert('A task can not be empty');
    } else {
      const isNumber = !isNaN(inputValue.split(',')[0]);

      if (isNumber) {
        await itemManager.addPokemons(inputValue);
      } else {
        itemManager.addItem(inputValue);
      }

      this.inputEl.value = null;
      this.renderList();
    }
  }

  renderList() {
    const todos = this.itemManager.todos;
    const filteredTodos = todos.filter(
      (todo) => !document.getElementById(todo.id)
    );
    filteredTodos.forEach((todo) => {
      const newItemEl = this.createItem(todo);
      this.listEl.appendChild(newItemEl);
    });
  }

  createItem(todo) {
    const listItem = document.createElement('li');
    const title = document.createElement('h4');
    const deleteBtn = document.createElement('button');

    listItem.id = todo.id;
    title.innerText = todo.task;
    deleteBtn.innerHTML = '<img src="./images/delete_icon.svg" alt="trash"/>';

    deleteBtn.classList.add('list-item-delete-button');
    listItem.classList.add('list-item');

    listItem.appendChild(title);
    listItem.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', (e) =>
      this.deleteItemHandler(listItem, e)
    );
    listItem.addEventListener('click', () => this.onItemClick(listItem));

    return listItem;
  }

  deleteItemHandler(todo, event) {
    event.stopPropagation();
    this.itemManager.removeItem(todo.id);
    this.listEl.removeChild(todo);
  }

  onItemClick(item) {
    const itemValue = item.querySelector('h4');
    alert(itemValue.innerText);
  }

  init() {
    this.addButtonEl.addEventListener('click', this.addTaskHandler.bind(this));
  }
}

const listEl = document.getElementById('list');
const inputEl = document.getElementById('list-item-input');
const addButtonEl = document.getElementById('list-item-submit');
const itemManager = new ItemManager();
const main = new Main(itemManager, listEl, inputEl, addButtonEl);

document.addEventListener('DOMContentLoaded', function () {
  main.init();
});
