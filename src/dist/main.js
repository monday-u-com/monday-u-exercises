const ENTER_KEY = "13";

class Main {
  constructor() {
    this.itemClient = new ItemClient();

    this.addItemButton = document.getElementById("list-item-submit");
    this.input = document.getElementById("list-item-input");
    this.loader = document.getElementById("loaderId");
  }

  init = async () => {
    this.addItemButton.addEventListener("click", (_) => this.handleItem());

    this.input.addEventListener("keyup", () => {
      if (event.keyCode == ENTER_KEY) {
        this.handleItem();
      }
    });

    await this.renderItems();
  };

  handleItem = async () => {
    if (this.input.value.trim() === "") {
      this.clearInput(this.input);
      return alert("There is no input");
    }

    this.loader.classList.remove("display");
    let returnedData = await this.itemClient.createItem(this.input.value);
    await this.renderItems().then((resolvedData) =>
      setTimeout(() => {
        this.loader.classList.add("display");
      }, 100)
    );

    this.clearInput(this.input);
  };

  clearInput() {
    this.input.value = "";
  }

  renderItems = async () => {
    let itemsData = await this.itemClient.fetchAllItems();

    const items = itemsData.data;

    const list = document.getElementById("list");
    list.innerHTML = "";

    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");

      let checkBoxElement = this._createCheckBox(item);
      checkBoxElement.classList.add("checkBox");

      let divElementWithName = document.createElement("DIV");
      divElementWithName.innerText = item.itemName;

      let inputElement = document.createElement("INPUT");
      inputElement.setAttribute("type", "text");
      inputElement.readOnly = true;
      inputElement.value = item.itemName;
      inputElement.classList.add("list-item-input");

      listItem.appendChild(checkBoxElement);
      listItem.appendChild(inputElement);

      if (item.isPokemon) {
        const listItemPicture = this.getPokemonImage(item);
        listItem.appendChild(listItemPicture);
      }

      const listItemDeleteButton = this._createDeleteButton(item);

      const listItemEditButton = this._createEditButton(item);

      listItem.appendChild(listItemDeleteButton);
      listItem.appendChild(listItemEditButton);
      listItem.setAttribute("id", item.itemId);
      if (checkBoxElement.firstChild.checked) {
        this.addCheckBoxStyle(listItem, item);
      }
      list.appendChild(listItem);
    });
    return "render items finished";
  };
  addCheckBoxStyle(listItem, item) {
    listItem.childNodes[1].classList.add("decorate");
    if (item.isPokemon) {
      listItem.childNodes[2].classList.add("decorate");
    }
  }

  getPokemonImage(pokemonData) {
    const url = pokemonData.pokemonData;

    const img = document.createElement("img");
    img.setAttribute("src", url);
    return img;
  }

  _createCheckBox = (item) => {
    let divElementWithCheckBox = document.createElement("DIV");
    let checkBox = document.createElement("INPUT");

    checkBox.setAttribute("type", "checkbox");
    checkBox.checked = item.status;

    checkBox.addEventListener("change", (_) => this.handleCheckBox(item));

    divElementWithCheckBox.appendChild(checkBox);

    return divElementWithCheckBox;
  };

  async handleCheckBox(item) {
    let listItem = document.getElementById(item.itemId);
    let itemCheckBox = listItem.firstChild.firstChild;
    let inputText = listItem.childNodes[1];

    if (itemCheckBox.checked) {
      this.addCompletedDecoration(item);
      this.itemClient.updateStatusInDb(item.itemId, true);

      let timestampNow = new Date();
      let timestampNowHours = timestampNow.getHours();
      timestampNow.setHours(timestampNowHours + 6);

      let timestampNowToDb = timestampNow
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    
      timestampNow = timestampNow.toDateString();
      inputText.value += ", " + timestampNow;

      await this.itemClient.updateDoneTimestamp(item.itemId, timestampNowToDb);
      await this.itemClient.updateNameInDb(item.itemId, inputText.value);
    } else {
      this.removeCompletedDecoration(item);
      this.itemClient.updateStatusInDb(item.itemId, false);
      this.itemClient.updateDoneTimestamp(item.itemId, null);
    }
  }

  addCompletedDecoration(item) {
    let listItem = document.getElementById(item.itemId);

    listItem.childNodes[1].classList.add("decorate");
    if (item.isPokemon) {
      listItem.childNodes[2].classList.add("decorate");
    }
  }

  removeCompletedDecoration(item) {
    let listItem = document.getElementById(item.itemId);
    listItem.childNodes[1].classList.remove("decorate");
    if (item.isPokemon) {
      listItem.childNodes[2].classList.remove("decorate");
    }
  }
  _createDeleteButton = (item) => {
    const button = document.createElement("img");
    button.src = "./images/delete-icon.svg";
    button.classList.add("list-item-delete-button");
    button.innerHTML = item.itemId;
    button.addEventListener("click", (_) => this.deleteItem(item));
    return button;
  };

  deleteItem = async (item) => {
    const itemId = item.itemId;

    this.loader.classList.remove("display");
    await this.itemClient.deleteItemById(itemId);
    await this.renderItems().then((resolvedData) =>
      setTimeout(() => {
        this.loader.classList.add("display");
      }, 100)
    );
  };
  _createEditButton = (item) => {
    const button = document.createElement("img");
    button.src = "./images/edit-icon.svg";
    button.classList.add("list-item-edit-button");
    button.innerHTML = item.itemId;
    button.addEventListener("click", () => this.editItem(item));

    return button;
  };

  editItem = async (item) => {
    const itemId = item.itemId;
    const listItem = document.getElementById(itemId);
    const parentDivTextElement = listItem.childNodes[0];

    const inputText = listItem.childNodes[1];
    inputText.readOnly = false;
    inputText.classList.remove("decorate");

    inputText.classList.add("edit-mode");

    const editButton = listItem.lastChild;

    editButton.setAttribute("src", "./images/save-icon.svg");
    editButton.classList.add("save");

    await editButton.addEventListener("click", () =>
      this.saveNewName(inputText, editButton, item)
    );
  };

  saveNewName = async (inputText, editButton, item) => {
    inputText.removeAttribute("placeholder");
    inputText.readOnly = true;

    editButton.setAttribute("src", "./images/edit-icon.svg");

    inputText.classList.remove("edit-mode");

    await this.itemClient.updateNameInDb(item.itemId, inputText.value);
    await this.renderItems().then((resolvedData) =>
      setTimeout(() => {
        this.loader.classList.add("display");

        if (!item.status) {
          inputText.classList.remove("decorate");
        }
      }, 100)
    );
  };
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
