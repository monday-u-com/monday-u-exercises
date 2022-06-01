import { ItemManagerCommander } from "./item-manager.js";
import { PokemonClient } from "./pokemon-client.js";
// import chalk from "chalk";
import { Command } from "commander";

class MainCommander {
  constructor(itemManagerCommander, pokemonClient) {
    this.itemManagerCommander = itemManagerCommander;
    this.pokemonClient = pokemonClient;
  }

  init() {
    this.updateTodos(this.itemManagerCommander.init());
  }

  showTodos() {
    this.todos.forEach(todo => {
      console.log(todo.text);
    });
  }

  addTodo(text) {
    this.updateTodos(this.itemManagerCommander.addItem(text));
  }

  updateTodos(updatedArray) {
    this.todos = updatedArray;
  }

  deleteTodoTask(index) {
    this.updateTodos(this.itemManagerCommander.deleteItem(index));
  }

  addTodoTask(text) {
    if (this.pokemonClient.isPokemon(text)) {
      this.addPokemon(text.toLowerCase());
    } else {
      const isTextNaN = text.split(',').map( el => isNaN(el));
      if (isTextNaN.includes(true)) {
        itemManagerCommander.addItem(text);
      } else {
        this.addPokemon(text);
      }
    }
  }

  addPokemon(text) {
    this.pokemonClient.fetchPokemon(text).then(pokemons => {
      try {
        pokemons.forEach(pokemon => {
          itemManagerCommander.addItem(`Catch ${pokemon}`);
        })
      } catch (error) {
        itemManagerCommander.addItem(`Failed to fetch ${text}`);
      }
    })
  }

  sortTodos() {
    this.updateTodos(this.itemManagerCommander.sortItems());
  }
}

const itemManagerCommander = new ItemManagerCommander();
const pokemonClient = new PokemonClient();
const mainCommander = new MainCommander(itemManagerCommander, pokemonClient);

mainCommander.init();

const program = new Command();

program
  .name("todos-manager")
  .description("Read, add, delete todos")
  .version("1.0.0");

program
  .command("add")
  .description("Add a new todo")
  .argument("<string>", "todo text")
  .action((text) => {
    mainCommander.addTodo(text);
    console.log(`Adding '${text}'`);
  });

program
  .command("show")
  .description("Show all todos")
  .action(() => {
    mainCommander.showTodos();
  });

program
  .command("sort")
  .description("Sort todos")
  .action(() => {
    mainCommander.sortTodos();
  });

program.parse();
