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

  renderItems = async () => {
    let itemsData = await this.itemClient.fetchAllItems();

    const items = itemsData.data;

    const list = document.getElementById("list");
    list.innerHTML = "";

    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      
      let checkBoxElement = this._createCheckBox(item)
      
      let divElement = document.createElement("DIV");
      divElement.innerText = item.name;

      listItem.appendChild(checkBoxElement);
      listItem.appendChild(divElement)

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
    const url = pokemonData.pokemonData;

    const img = document.createElement("img");
    img.setAttribute("src", url);
    return img;
  }

 _createCheckBox = (item) => {
  let divElementWithCheckBox = document.createElement("DIV");
  let checkBox = document.createElement("INPUT"); 
      checkBox.setAttribute("type", "checkbox");
      checkBox.addEventListener('change', function() {
        if (this.checked) {
          console.log("Checkbox is checked..");
console
        } else {
          console.log("Checkbox is not checked..");
        }
      });//("change" , (_) => this.handleCheckedItem(checkBox))
      divElementWithCheckBox.appendChild(checkBox)
      
      return divElementWithCheckBox

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
