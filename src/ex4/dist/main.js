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
    await this.itemClient.createItem(this.input.value);
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

  deleteItem = async (item) => {
    const itemId = item.itemId;

    this.loader.classList.remove("display");
    this.itemClient.deleteItemById(itemId);
    await this.renderItems().then((resolvedData) =>
      setTimeout(() => {
        this.loader.classList.add("display");
      }, 100)
    );
  };

  renderItems = async () => {
    let itemsData = await this.itemClient.fetchAllItems();

    const items = itemsData.data;

    const list = document.getElementById("list");
    list.innerHTML = "";

    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.innerHTML = item.name;

      if (item.isPokemon) {
        const listItemPicture = this.getPokemonImage(item);
        listItem.appendChild(listItemPicture);
      }

      const listItemDeleteButton = this._createDeleteButton(item);

      listItem.appendChild(listItemDeleteButton);
      listItem.setAttribute("id", item.itemId);
      list.appendChild(listItem);
    });
    return "render items finished";
  };

  getPokemonImage(pokemonData) {
    const url = pokemonData.picture;
    const img = document.createElement("img");
    img.setAttribute("src", url);
    return img;
  }

  _createDeleteButton = (item) => {
    const button = document.createElement("img");
    button.src = "./images/delete_icon.svg";
    button.classList.add("list-item-delete-button");
    button.innerHTML = item.itemId;
    button.addEventListener("click", (_) => this.deleteItem(item));

    return button;
  };
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
