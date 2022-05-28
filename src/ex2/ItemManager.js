import { pokemonClient } from "./PokemonClient.js";

class ItemManager {
  constructor() {
    this.itemList = [];
    this.pokemons = new Set();

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.createItemElement = this.createItemElement.bind(this);
  }

  async addItem(input) {
    const item = input.value;
    const inputArray = item.split(",");

    if (!isNaN(+inputArray[0])) {
      // if input is a number - fetch pokemon
      let allPromises = [];

      // add promises to allPromises array
      inputArray.forEach((elm) => {
        const id = elm.trim();
        const pokemonAlreadyAdded = this.pokemons.has(id);

        if (pokemonAlreadyAdded) {
          alert(`Pokemon with ID ${id} was alrady added!`);
        } else {
          allPromises.push(pokemonClient.fetchPokemon(id));
        }
      });

      // fetch all pokemons simulteniously
      const pokemonData = await Promise.all(allPromises);

      const filteredPokemons = pokemonData.filter((pokemon) => {
        if (this.pokemons.has(`${pokemon.name}`))
          alert(`Pokemon with ID ${pokemon.id} was alrady added!`);
        return !this.pokemons.has(`${pokemon.name}`);
      });

      const pokemonNames = filteredPokemons.map((pokemon) => {
        if (pokemon.name) {
          this.pokemons.add(`${pokemon.name}`);
          return pokemon.name;
        } else {
          return pokemon;
        }
      });

      // push todos with pokemons to list
      pokemonNames.forEach((name) => {
        const id = name.split(" ")[0];

        if (!isNaN(+id)) {
          this.itemList.push(`Pokemon with ID ${id} was not found`);
        } else {
          this.itemList.push(`Catch ${name}`);
        }
      });
    } else {
      // if input is a string - add to list
      this.itemList.push(item);
    }

    this.renderItems(this.itemList.at(-1));
  }

  removeItem({ target }) {
    const buttonId = target.id.split("-");
    buttonId.pop();
    const pokemonName = buttonId[1];
    const item = buttonId.join(" ");

    const itemIndex = this.itemList.findIndex((listItem) => {
      return listItem === item;
    });

    this.itemList.splice(itemIndex, 1);
    this.pokemons.delete(pokemonName);

    this.renderItems();
  }

  removeAll() {
    this.itemList.length = 0;
    this.pokemons.clear();

    this.renderItems();
  }

  renderItems(current) {
    const addItemButton = document.querySelector("#list-item-submit");
    const clearAllButton = document.querySelector("#clear-all-button");
    const sortByNameButton = document.querySelector("#sort-by-name-button");
    if (this.itemList.length === 0) {
      addItemButton.classList.add("hithere"); //add AddButton animation
      clearAllButton.classList.add("hidden"); //hide ClearAll button
      sortByNameButton.classList.add("hidden"); //hide Sort button
    } else {
      addItemButton.classList.remove("hithere"); //remove AddButton animation
      clearAllButton.classList.remove("hidden"); //show ClearAll button
      sortByNameButton.classList.remove("hidden"); //show Sort button
    }

    // clear list innerHTML
    const list = document.querySelector("#list");
    list.innerHTML = "";

    // create elements for exisitng items
    this.itemList.forEach((item) => {
      const itemNode = this.createItemElement(item, current);

      list.appendChild(itemNode);
    });
  }

  createItemElement(input, current) {
    const itemId = input.split(" ").join("-");

    //create list element, add class, innerHTML, eventListener
    const liElm = document.createElement("li");
    liElm.setAttribute("id", `${itemId}`);
    liElm.classList.add("list-item");
    if (input === current) divElm.classList.add("grow");
    liElm.innerHTML = input;
    liElm.addEventListener("click", () => alert(`Task: ${input}`));

    //create delete button, add id, class, src and clickListener
    const deleteButton = document.createElement("img");
    deleteButton.setAttribute("id", `${itemId}-delete`);
    deleteButton.classList.add("list-item-delete-button");
    deleteButton.src = "../images/delete_icon.svg";
    deleteButton.addEventListener("click", this.removeItem);
    liElm.appendChild(deleteButton);

    //clear input
    document.querySelector("#list-item-input").value = "";

    return liElm;
  }
}

export const itemManager = new ItemManager();
