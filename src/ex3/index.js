import { ItemManagerCommander } from "./item-manager-commander.js";
import { PokemonClient } from "./pokemon-client.js";
import chalk from "chalk";
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
    this.showAmount();
    this.todos.forEach((todo, index) => {
      const todoColor = todo.isNew ? 'green' : 'white';
      if (todo.isNew) this.markTodoAsOld(todo);
      console.log(chalk.yellow(index), chalk[todoColor](todo.text));
    });
  }

  showAmount() {
    const amount = this.todos.length;
    if (amount === 1) {
      console.log(chalk.yellow(`You have only one todo:`));
    } else {
      console.log(chalk.yellow(`You have ${amount} todos`));
    }
  }

  markTodoAsOld(todo) {
    this.updateTodos(this.itemManagerCommander.markItemAsOld(todo));
  }

  addTodo(text) {
    console.log(chalk.green(`Adding '${text}'`));
    if (this.pokemonClient.isPokemon(text)) {
      this.addPokemon(text.toLowerCase());
    } else {
      const isTextNaN = text.split(',').map( el => isNaN(el));
      if (isTextNaN.includes(true)) {
        this.updateTodos(this.itemManagerCommander.addItem(text));
      } else {
        this.addPokemon(text);
      }
    }
  }

  updateTodos(updatedArray) {
    this.todos = updatedArray;
  }

  deleteTodo(index) {
    if (Number.isInteger(index) && index > -1 && index < this.todos.length) {
      console.log(chalk.red(`Deleting todo with index ${index}`));
      this.updateTodos(this.itemManagerCommander.deleteItem(index));
    } else {
      console.log(chalk.red("ERROR"), `There is no todo with index ${index}`);
    }
  }

  clearAllTodos() {
    console.log(chalk.red("Deleting all todos"));
    this.updateTodos(this.itemManagerCommander.clearAllItems());
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
    console.log(chalk.gray(`Sorting todos`));
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
  .description("Add, delete, show and sort todos")
  .version("1.0.0");

program
  .command("add")
  .description("Add a new todo")
  .argument("<string>", "todo text")
  .action((text) => {
    mainCommander.addTodo(text);
  });

program
  .command("delete")
  .description("Delete an existing todo")
  .argument("<number>", "todo index")
  .action((index) => {
    mainCommander.deleteTodo(parseInt(index, 10));
  });

program
  .command("clear")
  .description("Clear all todos")
  .action(() => {
    mainCommander.clearAllTodos();
  });

program
  .command("show")
  .description("Show all todos")
  .action(() => {
    mainCommander.showTodos();
  });

program
  .command("sort")
  .description("Sort todos alphabetically")
  .action(() => {
    mainCommander.sortTodos();
  });

program.parse();
