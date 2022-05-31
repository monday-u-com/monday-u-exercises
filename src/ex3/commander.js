import { ItemManager } from "./item-manager.js";
import { PokemonClient } from "./pokemon-client.js";

class Main {
  constructor(itemManager, pokemonClient) {
    this.itemManager = itemManager;
    this.pokemonClient = pokemonClient;
  }

  init() {
    this.updateTodos(itemManager.init());
  }

  deleteTodoTask(index) {
    this.updateTodos(this.itemManager.deleteItem(index));
  }

  updateTodos(updatedArray) {
    this.todos = updatedArray;
  }

  addTodo(text) {
    if (this.pokemonClient.isPokemon(text)) {
      this.addPokemon(text.toLowerCase());
    } else {
      const isTextNaN = text.split(',').map( el => isNaN(el));
      if (isTextNaN.includes(true)) {
        itemManager.addItem(text);
      } else {
        this.addPokemon(text);
      }
    }
  }

  addPokemon(text) {
    this.pokemonClient.fetchPokemon(text).then(pokemons => {
      try {
        pokemons.forEach(pokemon => {
          itemManager.addItem(`Catch ${pokemon}`);
        })
      } catch (error) {
        itemManager.addItem(`Failed to fetch ${text}`);
      }
    })
  }

  onSortListButtonClicked() {
    this.updateTodos(this.itemManager.sortItems());
  }
}

const itemManager = new ItemManager();
const pokemonClient = new PokemonClient();
const main = new Main(itemManager, pokemonClient);

// document.addEventListener("DOMContentLoaded", function () {
//     // you should create an `init` method in your class
//     // the method should add the event listener to your "add" button
//     main.init();
// });
main.init();


import chalk from "chalk";
import { Command } from "commander";
const program = new Command();

program
  .name("cli-calc")
  .description("The best CLI calculator")
  .version("1.0.0");

program
  .command("add")
  .description("Add two numbers")
  .argument("<number>", "first operand")
  .argument("<number>", "second operand")
  .option("-c, --color <string>", "Result color", "white")
  .action((firstNumber, secondNumber, options) => {
    console.log(
      chalk[options.color](
        `Result: ${Number(firstNumber) + Number(secondNumber)}`
      )
    );
  });

program.parse();
