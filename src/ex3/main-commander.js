import chalk from "chalk";
import { LogPokemonAscii } from "./pokemon-ascii.js";

export class MainCommander {
  constructor(itemManagerCommander, pokemonClient) {
    this.itemManagerCommander = itemManagerCommander;
    this.pokemonClient = pokemonClient;
  }

  showTodos() {
    this.showAmount();
    const data = this.itemManagerCommander.getAll();
    data.forEach((todo, index) => {
      const todoColor = todo.isNew ? 'green' : 'white';
      if (todo.isNew) this.markTodoAsOld(todo);
      console.log(chalk.yellow(index), chalk[todoColor](todo.text));
    });
  }

  showAmount() {
    const data = this.itemManagerCommander.getAll();
    const amount = data.length;
    if (amount === 1) {
      console.log(chalk.yellow(`You have only one todo:`));
    } else {
      console.log(chalk.yellow(`You have ${amount} todos`));
    }
  }

  markTodoAsOld(todo) {
    this.itemManagerCommander.markItemAsOld(todo);
  }

  addTodo(text) {
    console.log(chalk.green(`Adding '${text}'`));
    if (this.pokemonClient.isPokemon(text)) {
      return this.addPokemon(text.toLowerCase());
    } else {
      const isTextNaN = text.split(',').map( el => isNaN(el));
      if (isTextNaN.includes(true)) {
        this.itemManagerCommander.addItem(text);
      } else {
        return this.addPokemon(text);
      }
    }
  }

  deleteTodo(index) {
    const data = this.itemManagerCommander.getAll();
    if (Number.isInteger(index) && index > -1 && index < data.length) {
      console.log(chalk.red(`Deleting todo with index ${index}`));
      this.itemManagerCommander.deleteItem(index);
    } else {
      console.log(chalk.red("Error"), `There is no todo with index ${index}`);
    }
  }

  clearAllTodos() {
    console.log(chalk.red("Deleting all todos"));
    this.itemManagerCommander.clearAllItems();
  }

  async addPokemon(text) {
    const pokemons = await this.pokemonClient.fetchPokemon(text);
    try {
      pokemons.forEach(pokemon => {
        const catchPokemonTodo = `Catch ${pokemon.name} with id ${pokemon.id} and type ${pokemon.type}`;
        this.itemManagerCommander.addItem(catchPokemonTodo);
        LogPokemonAscii(pokemon.id);
      })
    } catch (error) {
      console.log(chalk.red("Todo was not added"));;
    }
  }

  sortTodos() {
    console.log(chalk.gray(`Sorting todos alphabetically`));
    this.itemManagerCommander.sortItems();
  }
}
