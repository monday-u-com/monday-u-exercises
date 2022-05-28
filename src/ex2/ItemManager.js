import { pokemonClient } from "./PokemonClient.js";

class ItemManager {
  constructor() {
    this.itemList = [];
    this.pokemons = new Set();

    this.addItem = this.addItem.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.removeAll = this.removeAll.bind(this);
  }

  async addItem(input) {
    const item = input.value;
    const inputArray = item.split(",");

    if (!isNaN(+inputArray[0])) {
      // if first item input is a number - add pokemon
      await this.addPokemon(inputArray);
    } else {
      // if input is a string - add todo
      this.addToDo(item);
    }

    //clear input
    this.clearInputField();

    // render the list
    this.renderItems(this.itemList.at(-1));
  }

  addToDo(item) {
    this.itemList.push(this.capitalize(item));
  }

  async addPokemon(inputArray) {
    // add promises to allPromises array
    const allPromises = this.createPromises(inputArray);

    // fetch all pokemons simulteniously
    const pokemonData = await Promise.all(allPromises);

    //filter out new pokemons
    const newPokemons = pokemonData.filter((pokemon) => {
      if (this.pokemons.has(`${pokemon.name}`))
        alert(`Pokemon with ID ${pokemon.id} was alrady added!`); //alert existing pokemons
      return !this.pokemons.has(`${pokemon.name}`);
    });

    // add new pokemons to list of pokemons
    const pokemonNames = newPokemons.map((pokemon) => {
      if (pokemon.name) {
        this.pokemons.add(`${pokemon.name}`);
        return pokemon.name;
      } else {
        return pokemon;
      }
    });

    // push pokemons to todo list
    pokemonNames.forEach((name) => {
      const id = name.split(" ")[0];

      if (!isNaN(+id)) {
        //if first element is a number - it's id of a not found pokemon
        this.itemList.push(`Pokemon with ID ${id} was not found`);
      } else {
        //if first element is not a number - it's name of a found pokemon
        this.itemList.push(`Catch ${name}`);
      }
    });
  }

  createPromises(inputArray) {
    let allPromises = [];

    inputArray.forEach((elm) => {
      const id = elm.trim();

      allPromises.push(pokemonClient.fetchPokemon(id));
    });

    return allPromises;
  }

  removeItem(e, liElm) {
    e.stopPropagation();

    const itemId = liElm.id.split("-");
    const pokemonName = itemId[1];
    const item = itemId.join(" ");

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
    this.toggleFooter();

    // clear list innerHTML
    const list = document.querySelector("#list");
    list.innerHTML = "";

    // create elements for exisitng items
    this.itemList.forEach((item) => {
      const itemNode = this.createItemElement(item, current);

      list.appendChild(itemNode);
    });
  }

  toggleFooter() {
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
  }

  createItemElement(input, current) {
    const itemId = input.split(" ").join("-");

    //create list element, add class, innerHTML, eventListener
    const liElm = document.createElement("li");
    liElm.setAttribute("id", `${itemId}`);
    liElm.classList.add("list-item");
    if (input === current) liElm.classList.add("grow");
    liElm.innerHTML = input;
    liElm.addEventListener("click", () => alert(`Task: ${input}`));

    //create delete button, add id, class, src and clickListener
    const deleteButton = document.createElement("img");
    deleteButton.setAttribute("id", `${itemId}-delete`);
    deleteButton.classList.add("list-item-delete-button");
    deleteButton.src = "../images/delete_icon.svg";
    deleteButton.addEventListener("click", (e) => this.removeItem(e, liElm));
    liElm.appendChild(deleteButton);

    return liElm;
  }

  clearInputField() {
    document.querySelector("#list-item-input").value = "";
  }

  sortByName() {
    this.itemList.sort();

    this.renderItems();
  }

  capitalize(string) {
    const updatedString = string.charAt(0).toUpperCase() + string.slice(1);
    return updatedString;
  }
}

export const itemManager = new ItemManager();
