#!/usr/bin/env node

import chalk from "chalk";
import inquirer from 'inquirer';
/* import { Command } from "commander";
const program = new Command(); */
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
  if(todo.trim() === ""){ 
     console.log("can't add empty todo")
    return
  }
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

function showUpdates() {
  const data = pokemonClient.itemManager.getTodoList()
  getFullCurrentList(data)
}

const options = [
  {
      type: "list",
      name: "listOptions",
      message: "What you want to do in your list",
      choices: [
          "get full todo list",
          "add todo to the list",
          "delete todo from list",
          "edit todo from list",
          "clear all list",
          "alphabetichal list order",
          "reverse alphabetichal list order",
          "done to undone order",
          "undone to done order",
          "check or uncheck todo", 
          "get all done todos",
          "get all undone todos"
      ]
  }
]

inquirer
  .prompt(options)
  .then((answers) => {
      const answer = answers.listOptions
      switch (answer){
        case "get full todo list":
          showUpdates()
          break;

        case "add todo to the list":
            inquirer.prompt({
                type: 'input',
                name: 'addTodo',
                message: 'add new todo/single pokemon/multi pokemons - \nfor one pokemon write a number, \nfor multiple pokemons write a numbers seprate in comma, \nfor regular todo write a string with todo\n', 
            })
            .then(answers => {
              addAndShowAddedTodo(answers.addTodo)
            })
            break;

        case "delete todo from list":
          inquirer.prompt({
            type: 'number',
            name: 'deleteTodo',
            message: 'enter the index for todo that you want to delete', 
          })
          .then(answers => {
            if(isNaN(answers.deleteTodo)) return

            const deleteItem = pokemonClient.deleteTodo(answers.deleteTodo)

            if(deleteItem === null){
              console.log(chalk.bold.red("invalid index"))
            }
            else{
              console.log("deleted " + chalk.bold.blue(deleteItem.title))
            }
          })
          break;
        
        case "edit todo from list":
          inquirer.prompt({
            type: 'number',
            name: 'editTodoIndex',
            message: 'enter the index for todo that you want to edit', 
          })
          .then(answers => {
            if(isNaN(answers.editTodoIndex)) {
              console.log(chalk.bold.red("invalid index"))
              return
            }
            
            const getIndexData = pokemonClient.getDataInIndex(answers.editTodoIndex)
            
            if(getIndexData === null) {
              console.log(chalk.bold.red("invalid index"))
              return
            }
            
            inquirer.prompt({
              type: 'confirm',
              name: 'confirmEdit',
              message: `data in index ${answers.editTodoIndex} is ${pokemonClient.getDataInIndex(answers.editTodoIndex).title}, are you want to change it?`, 
            })
            .then(confirm => {
              if(confirm.confirmEdit === false) {
                return
              }

              inquirer.prompt({
                type: 'input',
                name: 'editTodo',
                message: `change ${getIndexData.title} to:`, 
              })
              .then((edit) => {
                if(edit.editTodo === "") {
                    console.log(chalk.bold.red("no change"));
                  return
                }

                const editedValue = pokemonClient.editDataInIndex(edit.editTodo, getIndexData.index);
                console.log('data in index ' +chalk.bold.cyan(getIndexData.index) + ' changed to ' + chalk.bold.green(editedValue.title))
              })
            })
          })

          break;

        case "clear all list":
          inquirer.prompt({
            type: 'confirm',
            name: 'clearTodo',
            message: 'are you sure you want to reset all the list?', 
          })
          .then(answers => {
            if(answers.clearTodo === true){
              console.log(chalk.bold.redBright("clear all todos"))
              pokemonClient.clearAllTodos()
              showUpdates()
            }
          })
          break;

        case "alphabetichal list order":
          pokemonClient.orderDataAlphabetically()
          showUpdates()
          break;

        case "reverse alphabetichal list order":
          pokemonClient.orderDataAlphabeticallyReverse()
          showUpdates()
          break;

        case "done to undone order":
          pokemonClient.orderDoneToUnDone()
          showUpdates()
          break;

        case "undone to done order": 
          pokemonClient.orderUnDoneToDone()
          showUpdates()
          break;

        case "check or uncheck todo":
          inquirer.prompt({
            type: 'number',
            name: 'checkUncheckTodoIndex',
            message: 'enter the index for todo that you want to check or uncheck', 
          })
          .then(answers => {
            if(isNaN(answers.checkUncheckTodoIndex)) return
            inquirer.prompt({
              type: 'list',
              name: 'checkUncheckOptions',
              message: `check/uncheck the todo in index ${answers.checkUncheckTodoIndex}`,
              choices: ["check", "uncheck"]
            })
            .then(answersNested => {
              let status

              if(answersNested.checkUncheckOptions === "check") {
                status = pokemonClient.changeDoneStatus(answers.checkUncheckTodoIndex, true);
              }else if(options.uncheck){
                status = pokemonClient.changeDoneStatus(answers.checkUncheckTodoIndex,false);
              } 

              if(status === null){
                console.log(chalk.bold.red("invalid index"))
              }
              else{
                const data = pokemonClient.itemManager.getTodoList()
                getFullCurrentList(data)
              }
            })
          })
          break;

          case "get all done todos":
            const doneTodos = pokemonClient.getDoneTodos()
            getFullCurrentList(doneTodos)
            break;
          
          case "get all undone todos":
            const undoneTodos = pokemonClient.getUnDoneTodos()
            getFullCurrentList(undoneTodos)
            break;
      }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Your console environment is not supported!")
    } else {
      console.log(error)
    }
})
