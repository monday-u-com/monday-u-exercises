import chalk from "chalk";
import { Command } from "commander";
const program = new Command();
import PokemonClient from './PokemonClient.js';

const pokemonClient = new PokemonClient();

function getFullCurrentList(){
  const data = pokemonClient.itemManager.getTodoList()

  if (data.length === 0) {
    console.log(chalk.bold.bgGrey("empty list"))
    return
  }

  console.log(chalk.bold.green("full list"))

  data.forEach((todo, index) => {
      console.log(chalk.bold.cyanBright(index) +": " + chalk.bold.magenta(todo.title) +" is " + (todo.done ? chalk.bold.green("done") : chalk.bold.red("undone")))
  })
}

program
  .name("PokeDoList")
  .description("todolist app with regular todos and catch pokemons todos. for run commands run node index.js and the command after as described in each command description")
  .version("1.0.0");

program
  .command("get")
  .description("get list of all todos - just enter the word get")
  .action(() => {
    getFullCurrentList()
  });

program
  .command("add")
  .description("add new todo/single pokemon/multi pokemons - enter the word add and after: for one pokemon write a number, for multiple pokemons write a numbers seprate in comma, for regular todo write a string wrap with two apostrophes")
  .argument("<string>", "todo")
  .action((todo) => {
    const prevLength = pokemonClient.itemManager.getTodoList().length
    pokemonClient.addTodo(todo)
    setTimeout(() => { //wait untill the async todo operation done
      const currLength = pokemonClient.itemManager.getTodoList().length
      const diff = currLength - prevLength
      const data = pokemonClient.itemManager.getTodoList()
      console.log(chalk.bold.blue('added new todo/s'))
      for (let i = 0; i < diff; i++) {
        console.log(chalk.bold.green(data[data.length-i-1].title))
      }
    },1000)
  })

program
  .command("delete")
  .description("delete todo - enter the word delete and after enter the index for todo that you want to delete")
  .argument("<number>", "todo")
  .action((todo) => {
    const deleteItem = pokemonClient.deleteTodo(todo)
    console.log("deleted " + chalk.bold.red(deleteItem.title))
  })

program
  .command("clear")
  .description("clear all todos and reset them to 0 - just enter the word clear")
  .action(() => {
    console.log(chalk.bold.redBright("clear all todos"))
    pokemonClient.clearAllTodos()
    getFullCurrentList()
  })

program
  .command("asc-order")
  .description("order all todos by alphabetichal order - just enter the word asc-order")
  .action(() => {
    pokemonClient.orderDataAlphabetically()
    getFullCurrentList()
  })

program
  .command("desc-order")
  .description("order all todos by reverse alphabetichal order - just enter the word desc-order")
  .action(() => {
    pokemonClient.orderDataAlphabeticallyReverse()
    getFullCurrentList()
  })

program
  .command("done-order")
  .description("order all todos by done to undone order - just enter the word done-order")
  .action(() => {
    pokemonClient.filterDoneToUnDone()
    getFullCurrentList()
  })

program
  .command("undone-order")
  .description("order all todos by undone to done order - just enter the word undone-order")
  .action(() => {
    pokemonClient.filterUnDoneToDone()
    getFullCurrentList()
  })

program
  .command("status")
  .description("check/unchecksingle todo, enter the word status, and after enter the index of todo and after true to check todo and false to uncheck todo")
  .argument("<index>")
  .argument("<status>")
  .action((index, status) => {
    pokemonClient.changeDoneStatus(index, status)
  })

program.parse();