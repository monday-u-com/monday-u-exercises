import chalk from "chalk";
import { Command } from "commander";
import ItemManager from "./ItemManager.js";
import PokemonClient from "./PokemonClient.js";

const program = new Command();
const itemManagerI = new ItemManager()
const pokemonClientI = new PokemonClient();

program
    .name("Todo-Cli")
    .description("The best cli for adding task an catching pokemons")
    .version("1.0.0");

program
    .command("add")
    .description("Add a task/pokemon to the list")
    .argument("<string>", "task")
    .action((task) => addTodo(task))

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

program.parse();

function addTodo(task) {
    //check if the inputs is ID or a comma separated list of IDs 
    if (/^\d+(\,\d+)+$/.test(task) || /^\d*$/.test(task)) {
        pokemonClientI.getPokemons(task).then((pokemons) => {
            if (pokemons) {
                pokemons.forEach((pokemon) => {
                    itemManagerI.addNewTask(`Catch ${pokemon}`);
                })
                console.log(chalk.green.bold("New Pokemons caught successfully"));
            } else {
                console.log(chalk.red.bold(`faild to fetch pokemon with this input: ${task}`));
            }
        })
    }

    //else input is a task
    else {
        itemManagerI.addNewTask(task);
        console.log(chalk.green.bold("New todo added successfully"))
    }
}