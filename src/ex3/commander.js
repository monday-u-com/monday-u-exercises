
import { Command } from "commander";
import { MainCommander } from "./main-commander.js";
import { ItemManagerCommander } from "./item-manager-commander.js";
import { PokemonClient } from "./pokemon-client-commander.js";
import Package from "./package.json" assert {type: "json"};
// call node --no-warnings commander.js
// to avoid this message:
// ExperimentalWarning: Importing JSON modules is an experimental feature. This feature could change at any time

const itemManagerCommander = new ItemManagerCommander();
const pokemonClient = new PokemonClient();
const mainCommander = new MainCommander(itemManagerCommander, pokemonClient);

itemManagerCommander.init();

const program = new Command();

program
  .name("todos-manager")
  .description("Add, delete, show and sort todos")
  .version(Package.version);

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
  .command("get")
  .description("Get all todos")
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
