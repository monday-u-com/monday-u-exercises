import ItemManager from "./ItemManager.js";
import PokemonClient from "./PokemonClient.js";
import RenderList from "./RenderList.js";
import Pokemon from "./Pokemons.js";
import Task from "./Tasks.js";


export default class App{
    constructor(){
        this.itemManager = new ItemManager();
        this.render = new RenderList(
            this.itemManager,this.itemManager.getCurrentTask
        );
        this.pokemonFetchId = new PokemonClient();
        this.formInput = document.querySelector(".form-input");
        this.addTaskBtn = document.querySelector(".add-new-button");
        this.deleteAllTasksBtn = document.querySelector(".delete-all-tasks");
    }
    // 
    initializeApp() {
        this.render.renderList(this.itemManager.getItems());
    
        this.addTaskBtn.addEventListener("click", async () => {
          let userValue = this.inputBox.value;
    
          if (userValue.trim() === "") {
            alert("Please enter a valid input");
          } else {
            if (this.isOnlyNumbers(userValue)) {
              const parsedInput = this.parseUserInputToIds(userValue);
              try {
                const pokemons = await this.pokemonFetchId.fetchPokemonsById(
                  parsedInput
                );
                this.addPokemonsToList(pokemons);
                this.inputBox.value = "";
                this.render.renderList(this.itemManager.getItems());
              } catch (e) {}
            } else {
              this.itemManager.addTask(
                new Task(userValue, this.getNowTime(), false)
              );
              this.inputBox.value = "";
              this.render.renderList(this.itemManager.getItems());
            }
          }
        });
    
        this.inputBox.addEventListener("keypress", (event) => {
          if (event.key === "Enter") {
            this.addTaskBtn.click();
          }
        });
    
        this.deleteAllTasksBtn.addEventListener("click", () => {
          this.itemManager.deleteAllItems();
          this.render.renderList(this.itemManager.getItems());
        });
      }
    
      addPokemonsToList(pokemons) {
        pokemons.forEach((pokemon) => {
          if (pokemon.name) {
            this.itemManager.addTask(
              new Pokemon(pokemon.name, pokemon.id, pokemon.types[0].type.name)
            );
          } else {
            this.itemManager.addTask(
              new Task(
                `Pokemon with ID ${pokemon} was not found`,
                this.getNowTime(),
                false
              )
            );
          }
        });
      }
    
      pokemonAlreadyExist(pokemon) {}
    
      createPokemonNotFoundMsg(pokemonId) {
        return `Pokemon with ID ${pokemonId} was not found`;
      }
    
      isOnlyNumbers(userValue) {
        const regex = /^[\d,]+$/;
        return regex.test(userValue);
      }
    
      parseUserInputToIds(userInput) {
        return userInput.split(",");
      }
    
      getNowTime() {
        var today = new Date();
        var nowtime =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate() +
          " " +
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        return nowtime;
      }
    }
    








