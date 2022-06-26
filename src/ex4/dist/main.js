import { ItemClient } from './clients/item_client.js';

class Main {
  constructor() {
    this.itemClient = new ItemClient();
  }

  init = async () => {
    const addItemButton = document.getElementById('list-item-submit');
    addItemButton.addEventListener('click', this.handleItem);
    const deleteAllButton = document.getElementById('delete-all-button');
    deleteAllButton.addEventListener('click', this.deleteAll);
    const listItemInput = document.getElementById('list-item-input');
    listItemInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addItemButton.click();
      }
    });

    await this.renderItems();
  };

  handleItem = async () => {
    const inputEl = document.getElementById('list-item-input');
    const inputValue = inputEl.value.trim();
    const inputArray = inputValue.split(',');

    if (!inputValue) {
      // add nice error message
      alert('A task can not be empty');
    } else {
      await this.itemClient.addItems(inputArray);
      inputEl.value = null;
    }
    await this.renderItems();
  };

  deleteItem = async (id) => {
    await this.itemClient.removeItem(id);
    await this.renderItems();
  };

  editItem = async (event, id) => {
    const listItemLabel = document.getElementById(id).querySelector('label');
    if (event.key === 'Enter') {
      listItemLabel.contentEditable = 'false';
      if (listItemLabel.prevText !== listItemLabel.innerHTML) {
        await this.itemClient.editItem(id, listItemLabel.innerHTML);
      }
    }
  };

  toggleEditMode = (id) => {
    const listItemLabel = document.getElementById(id).querySelector('label');
    listItemLabel.prevText = listItemLabel.innerHTML;
    const currentState = listItemLabel.contentEditable;
    listItemLabel.contentEditable = currentState === 'true' ? 'false' : 'true';
  };

  onItemClick = (item) => {
    alert(item.innerHTML);
  };

  deleteAll = async () => {
    await this.itemClient.removeAll();
    await this.renderItems();
  };

  toggleState = async (id) => {
    await this.itemClient.changeState(id);
  };

  renderItems = async () => {
    const list = document.getElementById('list');
    list.innerHTML = '';
    list.style.display = 'none';
    const loader = document.querySelector('.loader-container');
    loader.style.display = 'flex';

    const items = await this.itemClient.getItems();

    items.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.id = item.id;

      listItem.classList.add('list-item');

      const listItemDeleteButton = this._createDeleteButton(item.id);
      const listItemEditButton = this._createEditButton(item.id);
      const label = this._createLabel(item.id, item.ItemName);
      const checkboxInput = this._createCheckBox(item.id, item.status);
      listItem.appendChild(checkboxInput);
      listItem.appendChild(label);
      listItem.appendChild(listItemEditButton);
      listItem.appendChild(listItemDeleteButton);
      list.appendChild(listItem);
    });

    loader.style.display = 'none';
    list.style.display = 'flex';
  };

  _createDeleteButton = (id) => {
    const button = document.createElement('img');
    button.src = './images/delete_icon.svg';
    button.classList.add('list-item-button');
    button.addEventListener('click', () => this.deleteItem(id));

    return button;
  };

  _createEditButton = (id) => {
    const button = document.createElement('img');
    button.src = './images/edit_icon.svg';
    button.classList.add('list-item-button', 'list-item-edit-button');
    button.addEventListener('click', () => this.toggleEditMode(id));

    return button;
  };

  _createLabel = (id, text) => {
    const label = document.createElement('label');
    label.contentEditable = false;
    label.innerHTML = text;
    label.prevText = text;
    label.addEventListener('keypress', async (event) =>
      this.editItem(event, id)
    );

    return label;
  };
  _createCheckBox = (id, status) => {
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.addEventListener('click', () => this.toggleState(id));
    checkboxInput.checked = status;

    return checkboxInput;
  };
}

const main = new Main();

document.addEventListener('DOMContentLoaded', function () {
  main.init();
});
