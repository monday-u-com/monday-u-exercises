import chalk from "chalk";
import { Command } from "commander";
const program = new Command();
import PokemonClient from './PokemonClient.js';

const pokemonClient = new PokemonClient();

function getFullCurrentList(data){

  if (data.length === 0) {
    console.log(chalk.bold.bgGrey("empty list"))
    return
  }

  console.log(chalk.bold.green("full list:"))

  data.forEach((todo, index) => {
      console.log(chalk.bold.cyanBright(index) +": " 
        + chalk.bold.magenta(todo.title) +" is " 
        + (todo.done ? chalk.bold.green("done") : chalk.bold.red("undone")))
  })
}

function addAndShowAddedTodo(todo) {
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
}

program
  .name("PokeDoList")
  .description("todolist app with regular todos and catch pokemons todos. for run commands run node index.js and the command after as described in each command description")
  .version("1.0.0");

program
  .command("get")
  .description("get list of all todos - just enter the word get")
  .action(() => {
    const data = pokemonClient.itemManager.getTodoList()
    getFullCurrentList(data)
  });

program
  .command("add")
  .description("add new todo/single pokemon/multi pokemons - enter the word add and after: for one pokemon write a number, for multiple pokemons write a numbers seprate in comma, for regular todo write a string wrap with two apostrophes")
  .argument("<string>", "todo")
  .action((todo) => addAndShowAddedTodo(todo))

program
  .command("delete")
  .description("delete todo - enter the word delete and after enter the index for todo that you want to delete")
  .argument("<number>", "todo", (value)=> parseInt(value,10)) //convert to int
  .action((todo) => {
    const deleteItem = pokemonClient.deleteTodo(todo)
    if(deleteItem === null){
      console.log(chalk.bold.red("invalid index"))
    }
    else{
      console.log("deleted " + chalk.bold.blue(deleteItem.title))
    }
  })

program
  .command("clear")
  .description("clear all todos and reset them to 0 - just enter the word clear")
  .action(() => {
    console.log(chalk.bold.redBright("clear all todos"))
    pokemonClient.clearAllTodos()
    const data = pokemonClient.itemManager.getTodoList()
    getFullCurrentList(data)
  })

program
  .command("asc-order")
  .description("order all todos by alphabetichal order - just enter the word asc-order")
  .action(() => {
    pokemonClient.orderDataAlphabetically()
    const data = pokemonClient.itemManager.getTodoList()
    getFullCurrentList(data)
  })

program
  .command("desc-order")
  .description("order all todos by reverse alphabetichal order - just enter the word desc-order")
  .action(() => {
    pokemonClient.orderDataAlphabeticallyReverse()
    const data = pokemonClient.itemManager.getTodoList()
    getFullCurrentList(data)
  })

program
  .command("done-order")
  .description("order all todos by done to undone order - just enter the word done-order")
  .action(() => {
    pokemonClient.filterDoneToUnDone()
    const data = pokemonClient.itemManager.getTodoList()
    getFullCurrentList(data)
  })

program
  .command("undone-order")
  .description("order all todos by undone to done order - just enter the word undone-order")
  .action(() => {
    pokemonClient.filterUnDoneToDone()
    const data = pokemonClient.itemManager.getTodoList()
    getFullCurrentList(data)
  })

program
  .command("status")
  .description("check/unchecksingle todo, enter the word status, and after the -i flag and after the index, and the the -ch flag to check item and -uch to uncheck item")
  .option("-i, --index <index>","int arg",(value)=> parseInt(value,10) )
  .option("-ch, --check")
  .option("-uch, --uncheck")
  .action((options) => {
    let status
    if(options.check){
      status = pokemonClient.changeDoneStatus(options.index, true);
    }else if(options.uncheck){
      status = pokemonClient.changeDoneStatus(options.index, false);
    }

    if(status === null){
      console.log(chalk.bold.red("invalid index"))
    }
    else{
      const data = pokemonClient.itemManager.getTodoList()
      getFullCurrentList(data)
    }
    
  })

program
  .command("get-done")
  .description("filter all done todos - just enter get-done")
  .action(() => {
    const doneTodos = pokemonClient.getDoneTodos()
    getFullCurrentList(doneTodos)
  })

  program
  .command("get-undone")
  .description("filter all undone todos - just enter get-undone")
  .action(() => {
    const undoneTodos = pokemonClient.getUnDoneTodos()
    getFullCurrentList(undoneTodos)
  })

program.parse();