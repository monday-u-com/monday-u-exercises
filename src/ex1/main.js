
const inputText = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const orderDescBtn = document.querySelector(".fa-arrow-up");
const orderAscBtn = document.querySelector(".fa-arrow-down");


// View
class Main {
  constructor() {
    this.listOfToDoArr = [];
  }
  // Adds event handlers
  init() {
    // Onkeyup event
    inputText.onkeyup = () => {
      const userEnteredValue = inputText.value;
      if (!userEnteredValue.trim()) {
        addBtn.classList.remove("active");
      } else {
        addBtn.classList.add("active");
      }
    };

    //Add new task
    addBtn.onclick = () => {
      const userEnteredValue = inputText.value;
      if (userEnteredValue.trim().length === 0) return; //input validation
      itemManager.addToDo(userEnteredValue);
      this.render();
      confetti({
        particleCount: 250,
        spread: 45,
        origin: { y: 0.8 },
      });
      addBtn.classList.remove("active");
    };

    orderAscBtn.onclick = () => {
      let getLocalStorageData = localStorage.getItem("New Todo");
      this.listOfToDoArr = JSON.parse(getLocalStorageData);
      let sortedListOfToDoArr = this.listOfToDoArr.sort();
      localStorage.setItem("New Todo", JSON.stringify(sortedListOfToDoArr));
      document.getElementById("arrow-down").style.color = "#721ce3";
      document.getElementById("arrow-up").style.color = "#bb87ff";
      this.render();
    };

    orderDescBtn.onclick = () => {
      let getLocalStorageData = localStorage.getItem("New Todo");
      this.listOfToDoArr = JSON.parse(getLocalStorageData);
      let sortedListOfToDoArr = this.listOfToDoArr.sort().reverse();
      localStorage.setItem("New Todo", JSON.stringify(sortedListOfToDoArr));
      document.getElementById("arrow-up").style.color = "#721ce3";
      document.getElementById("arrow-down").style.color = "#bb87ff";
      this.render();
    };

    deleteAllBtn.onclick = () => {
      itemManager.deleteAllToDo();
      this.render();
    };

    inputText.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        addBtn.onclick();
      }
    });
  }

  deleteTask(index) {
    itemManager.deleteToDo(index);
    this.render();
  }

  render() {
    const getLocalStorageData = localStorage.getItem("New Todo") || [];
    
    this.listOfToDoArr = JSON.parse(getLocalStorageData);

    if (!this.listOfToDoArr.length) {
      document.getElementById("footer").style.display = "none"; // Empty display
      document.getElementById("order-container").style.display = "none";
      document.getElementById("gif").style.display = "inline";
      document.getElementById("arrow-up").style.color = "#bb87ff";
      document.getElementById("arrow-down").style.color = "#bb87ff";
    } else {
      document.getElementById("footer").style.display = "block";
      document.getElementById("order-container").style.display = "block";
      document.getElementById("gif").style.display = "none";
    }

    const pendingToDo = document.querySelector(".pendingTasks");
    pendingToDo.textContent = this.listOfToDoArr.length;

    if (!this.listOfToDoArr.length) {
      deleteAllBtn.classList.remove("active");
    } else {
      deleteAllBtn.classList.add("active");
    }
    let newToDoTag = "";
    this.listOfToDoArr.forEach((toDo, index) => {
      newToDoTag += `<li>${toDo}<span class="icon" onclick="main.deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newToDoTag;
    inputText.value = "";
  }
}

// Controller - manage the item adding/removing + pokemon fetching
class ItemManager {
  //check type of input
  async addToDo(userEnteredValue) {
    let listOfPokemons = new Array();
    let listOfPokemonsToInsert = new Array();
    let resolvedPromises = new Array();
    const isPokemonID = this.isInputNumber(userEnteredValue);
    const isPokemonListID = this.isInputNumberArray(userEnteredValue);
    // single pokemon id
    if (isPokemonID) {
      const pokemonName = await this.fetchFromApi(Number(userEnteredValue));
      userEnteredValue =
        typeof pokemonName !== "undefined"
          ? `Catch ${pokemonName}`
          : `Oops! Such pokemon was not found yet`;
    }
    // List of pokemon ID
    else if (isPokemonListID.length) {
      listOfPokemons = await Promise.all([
        resolvedPromises = await Promise.all(isPokemonListID.map(pokemonID => this.fetchFromApi(pokemonID)))
      ]).catch((err) => {
        console.log(err);
      });
      resolvedPromises.map((pokemon) => {
        userEnteredValue =
          typeof pokemon !== "undefined"
            ? `Catch ${pokemon}`
            : `Oops! Such pokemon was not found yet`;
        listOfPokemonsToInsert.push(userEnteredValue);
      });
    }

    const getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
      main.listOfToDoArr = [];
    } else {
      main.listOfToDoArr = JSON.parse(getLocalStorageData);
    }
    // If there is a list of pokemons, insert one by one
    // else insert single value
    if (listOfPokemonsToInsert.length) {
      listOfPokemonsToInsert.map((pokemonToInsert) => {
        main.listOfToDoArr.push(pokemonToInsert);
      });
    } else {
      main.listOfToDoArr.push(userEnteredValue);
    }
    localStorage.setItem("New Todo", JSON.stringify(main.listOfToDoArr));
    main.render();
  }

  async fetchFromApi(pokemonId) {
    const pokemon = new PokemonClient(pokemonId);
    const pokemonName = await pokemon.getPokemon();

    return typeof pokemonName !== "undefined" ? pokemonName : undefined;
  }

  isInputNumber(inputNumber) {
    return Number.isInteger(Number(inputNumber)) ? true : false;
  }

  // if array of numbers, return an array of numbers, else return empty array and the todo will be regular
  isInputNumberArray(inputArray) {
    const tempList = inputArray.split(",");
    const listOfPokemonsID = [];
    tempList.map((pokemonID) => {
      if (Number.isInteger(Number(pokemonID)) && Number(pokemonID) > 0) {
        listOfPokemonsID.push(pokemonID);
      } else {
        listOfPokemonsID.push(undefined);
      }
    });
    // Check if list of numbers or string
    if (listOfPokemonsID.every(ID => ID === undefined))
        return [];
    else
        return listOfPokemonsID;
  }

  deleteAllToDo() {
    main.listOfToDoArr = [];
    localStorage.setItem("New Todo", JSON.stringify(main.listOfToDoArr));
  }

  deleteToDo(index) {
    const getLocalStorageData = localStorage.getItem("New Todo");
    main.listOfToDoArr = JSON.parse(getLocalStorageData);
    main.listOfToDoArr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(main.listOfToDoArr));
  }
}

//Model - fetch data from the Pokemon API
class PokemonClient {
  constructor(pokemonId) {
    this.pokemonId = pokemonId;
  }

  async getPokemon() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${this.pokemonId}/`
      );
      const pokemonName = await response.json();
      return pokemonName.name;
    } catch (error) {
      console.log(error);
    }
  }
}

const main = new Main();
const itemManager = new ItemManager();

document.addEventListener("DOMContentLoaded", function () {
  localStorage.setItem("New Todo", "[]");
  main.render();
  main.init();
});
