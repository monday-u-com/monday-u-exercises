// Implement the `Main` class here

import { ItemManager } from './ItemManager.js';

export class Main {
  constructor(itemManager, listEl, inputEl, addButtonEl,deleteAllButtonEl) {
    this.itemManager = itemManager;
    this.listEl = listEl;
    this.inputEl = inputEl;
    this.addButtonEl = addButtonEl;
    this.deleteAllButtonEl = deleteAllButtonEl;
  }

  async addTaskHandler() {
    const inputValue = this.inputEl.value.trim();
    const inputArray = inputValue.split(',');

    if (!inputValue) {
      alert('A task can not be empty');
    } else {
      const isNumber = !isNaN(inputValue.split(',')[0]);

      if (isNumber) {
        await itemManager.addPokemons(inputArray);
      } else {
        itemManager.addItem(inputArray);
      }

      this.inputEl.value = null;
      this.renderList();
    }
  }

  renderList() {
    this.listEl.innerHTML ='';
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
    this.renderList();
  }

  onItemClick(item) {
    const itemValue = item.querySelector('h4');
    alert(itemValue.innerText);
  }

  deleteAll(){
    this.itemManager.removeAll();
    this.renderList();
  }

  init() {
    this.addButtonEl.addEventListener('click', this.addTaskHandler.bind(this));
    this.deleteAllButtonEl.addEventListener('click', this.deleteAll.bind(this));
  }
}

const listEl = document.getElementById('list');
const inputEl = document.getElementById('list-item-input');
const addButtonEl = document.getElementById('list-item-submit');
const deleteAllButtonEl = document.getElementById('delete-all-button');
const itemManager = new ItemManager();
const main = new Main(itemManager, listEl, inputEl, addButtonEl, deleteAllButtonEl);

document.addEventListener('DOMContentLoaded', function () {
  main.init();
});
