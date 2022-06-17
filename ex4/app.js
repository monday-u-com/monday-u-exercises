import ItemManager from "../last_Exc/ex2/ItemManager";
import { Item } from "./dist/clients/item_client.js";
import Task from "../last_Exc/ex2/Tasks.js";
import PokemonClient from "../last_Exc/ex2/PokemonClient.js";
import Pokemon from "../last_Exc/ex2/Pokemons.js";
import RenderTaskList from "../last_Exc/ex2/RenderList.js";

export default class App {
  constructor() {
    this.itemManager = new ItemManager();
    this.RenderTaskList = new RenderTaskList(this.itemManager,this.itemManager.tasksArray());
    this.pokemonFetcher = new PokemonClient();
    this.inputFiled = document.querySelector(".new-input");
    this.addTaskBtn = document.querySelector(".new-button");
    this.clearAllTasksBtn = document.querySelector(".clear-all-btn");
  }

  runApp() {
    this.RenderTaskList.render(this.itemManager.tasksArray());

    this.addTaskBtn.addEventListener("click", async () => {
      let inputValue = this.inputFiled.value;

      if (inputValue.trim() === "") {
        alert("Invalid Optins");
      } else {
        if (this.inputOfNums(inputValue)) {
          const parsedInput = this.checkUserInput(inputValue);
          try {
            const pokemons = await this.pokemonFetcher.pokemonFetcherById(parsedInput);
            this.insertPokemon(pokemons);
            this.inputFiled.value = "";
            this.RenderTaskList.render(this.itemManager.tasksArray());
          } catch (e) {}
        } else {
          this.itemManager.addItem(
            new Task(inputValue, false)
          );
          this.inputFiled.value = "";
          this.RenderTaskList.render(this.itemManager.tasksArray());
        }
      }
    });
    
    this.inputFiled.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.addTaskBtn.click();
      }
    });

    this.clearAllTasksBtn.addEventListener("click", () => {
      this.itemManager.clearAllTasks();
      this.RenderTaskList.render(this.itemManager.tasksArray());
    });
  }
  checkUserInput(userInput) {
    return userInput.split(",");
  }
  inputOfNums(inputValue) {
    const regex = /^[\d,]+$/;
    return regex.test(inputValue);
  }
  insertPokemon(pokemons) {
    pokemons.forEach((pokemon) => {
      if (pokemon.name) {
        this.itemManager.addItem(
          new Pokemon(pokemon.name, pokemon.id, pokemon.types[0].type.name)
        );
      } else {
        this.itemManager.addItem(
          new Task(
            `${pokemon} Id of Pokemon not exist`,
            false
          )
        );
      }
    });
  }
  pokemonNotFound(pokemonId) {
    return `This ${pokemonId}s was not found`;
  }

 

 
}
