import chalk from "chalk";
import { Command } from "commander";
const program = new Command();
import PokemonClient from './PokemonClient.js';

const pokemonClient = new PokemonClient();

program
  .name("todolist")
  .description("PokeDoList")
  .version("1.0.0");

program
  .command("get")
  .description("get list")
  .option("-c, --color <string>", "Result color", "white") //chalk
  .action(() => {
    console.log(chalk.bold.green("full list"))
    pokemonClient.showTodos()
  });

program
  .command("add")
  .description("add new todo/single pokemon/multi pokemons")
  .argument("<string>", "todo")
  .option("-c, --color <string>", "Result color", "white") //chalk
  .action((todo) => {
    chalk.bold.green(pokemonClient.addTodo(todo))
  })

program
  .command("delete")
  .description("delete todo")
  .argument("<number>", "todo")
  .option("-c, --color <string>", "Result color", "white") //chalk
  .action((todo) => {
    chalk.bold.green(pokemonClient.deleteTodo(todo))
  })

program
  .command("clear")
  .description("clear all todos")
  .option("-c, --color <string>", "Result color", "white") //chalk
  .action(() => {
    chalk.bold.green(pokemonClient.clearAllTodos())
  })

program
  .command("a")
  .description("filter a-z")
  .option("-c, --color <string>", "Result color", "white") //chalk
  .action(() => {
    chalk.bold.green(pokemonClient.filterDataAToZ())
  })

program
  .command("z")
  .description("filter z-a")
  .option("-c, --color <string>", "Result color", "white") //chalk
  .action(() => {
    chalk.bold.green(pokemonClient.filterDataZToA())
  })

program
  .command("status")
  .description("check/uncheck todo")
  .argument("<index>")
  .argument("<status>")
  .option("-b, --bool <boolean>", "boolean", "white") //chalk
  .action((index, status) => {
    chalk.bold.green(pokemonClient.changeDoneStatus(index, status));
  })

program.parse();