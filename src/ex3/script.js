import { Command } from "commander";
import ItemManager from "./ItemManager.js";


const program = new Command();
const itemManagerI = new ItemManager()

program
    .name("Todo-Cli")
    .description("The best cli for adding task an catching pokemons")
    .version("1.0.0");

program
    .command("add")
    .description("Add a task/pokemon to the list")
    .argument("<string>", "task")
    .action((task) => itemManagerI.addNewTask(task))

program
    .command("get")
    .description("Show all the task/pokemon you have")
    .action(() => itemManagerI.get())

program
    .command("delete")
    .description("Delete a task/pokemon by is index from the list")
    .argument("<int>", "index")
    .action((index) => itemManagerI.removeTask(index))

program
    .command("sort")
    .description("Sort the list of todos")
    .action(() => itemManagerI.sortArr())

program
    .command("clear")
    .description("Clear the list of todos")
    .action(() => itemManagerI.clearArr())

program.parse();
