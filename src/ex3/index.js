#!/usr/bin/env node

import chalk from "chalk";
import inquirer from 'inquirer';
import Main from './main.js';

const main = new Main();

function getFullCurrentList(data){

  if (data.length === 0) {
    console.log(chalk.bold.bgGrey("empty list"))
    return
  }

  console.log(chalk.bold.green("full list:"))

  data.forEach((todo, index) => {
      const indexText = chalk.bold.cyanBright(index)
      const titleText = chalk.bold.magenta(todo.title)
      const doneUndoneText = todo.done ? chalk.bold.green("done") : chalk.bold.red("undone")
      console.log(`${indexText}: ${titleText} is ${doneUndoneText}`)
  })
}

function addAndShowAddedTodo(todo) {
  if(todo.trim() === ""){ 
     console.log("can't add empty todo")
    return
  }
  const prevLength = main.itemManager.getTodoList().length
    main.addTodo(todo)
    setTimeout(() => { //wait untill the async todo operation done
      const currLength = main.itemManager.getTodoList().length
      const diff = currLength - prevLength
      const data = main.itemManager.getTodoList()
      console.log(chalk.bold.blue('added new todo/s'))
      for (let i = 0; i < diff; i++) {
        console.log(chalk.bold.green(data[data.length-i-1].title))
      }
    },1000)
}

function showFullUpdatedList() {
  const data = main.itemManager.getTodoList()
  getFullCurrentList(data)
}

function numberValidation(value){
  if(isNaN(value)) {
    console.log(chalk.bold.red("The index should be number"))
    return false
  }

  return true
}

function indexValidation(value){
  if(value === null){
    console.log(chalk.bold.red("invalid index"))
    return false
  }

  return true
}

function addTodoToList() {
  inquirer.prompt({
    type: 'input',
    name: 'addTodo',
    message: 'add new todo/single pokemon/multi pokemons - \nfor one pokemon write a number, \nfor multiple pokemons write a numbers seprate in comma, \nfor regular todo write a string with todo\n', 
  })
  .then(answers => {
    addAndShowAddedTodo(answers.addTodo)
  })
}

function deleteTodoFromList() {
  inquirer.prompt({
    type: 'number',
    name: 'deleteTodo',
    message: 'enter the index for todo that you want to delete', 
  })
  .then(answers => {
    if(!numberValidation(answers.deleteTodo)) return

    const deleteItem = main.deleteTodo(answers.deleteTodo)

    if(!indexValidation(deleteItem)){
      return
    }
    else{
      console.log(`deleted ${chalk.bold.blue(deleteItem.title)}`)
    }
  })
}

function editTodoFromList(){
  inquirer.prompt({
    type: 'number',
    name: 'editTodoIndex',
    message: 'enter the index for todo that you want to edit', 
  })
  .then(answers => {
    if(!numberValidation(answers.editTodoIndex)) return
    
    const getIndexData = main.getDataInIndex(answers.editTodoIndex)
    
    if(!indexValidation(getIndexData)) {
      return
    }
    
    confirmEdit(answers.editTodoIndex, getIndexData)
  })
}

function confirmEdit(editedIndex, getIndexData){
  inquirer.prompt({
    type: 'confirm',
    name: 'confirmEdit',
    message: `data in index ${editedIndex} is ${getIndexData.title}, are you want to change it?`, 
  })
  .then(confirm => {
    if(confirm.confirmEdit === false) {
      return
    }

    editData(getIndexData.title, getIndexData.index)
  })
}

function editData(title, index) {
  inquirer.prompt({
    type: 'input',
    name: 'editTodo',
    message: `change ${title} to:`, 
  })
  .then((edit) => {
    if(edit.editTodo === "") {
      console.log(chalk.bold.red("no change"));
      return
    }

    const editedValue = main.editDataInIndex(edit.editTodo, index);
    const indexText = chalk.bold.cyan(index)
    const titleText = chalk.bold.green(editedValue.title)
    console.log(`data in index ${indexText} changed to ${titleText}`)
  })
}

function clearAllTodosFromList(){
  inquirer.prompt({
    type: 'confirm',
    name: 'clearTodo',
    message: 'are you sure you want to reset all the list?', 
  })
  .then(answers => {
    if(answers.clearTodo === true){
      console.log(chalk.bold.redBright("clear all todos"))
      main.clearAllTodos()
      showFullUpdatedList()
    }
    else{
      console.log(chalk.bold.red("no change"));
      return
    }
  })
}

function orderList(){
  inquirer.prompt({
    type: 'list',
    name: 'listOptions',
    message: 'which order do you want to list?', 
    choices:[
      "alphabetichal list order",
      "reverse alphabetichal list order",
      "done to undone order",
      "undone to done order"
    ]
  })
  .then(answers => {
    const answer = answers.listOptions
    switch(answer){
      case "alphabetichal list order":
        main.orderDataAlphabetically()
        break;

      case "reverse alphabetichal list order":
        main.orderDataAlphabeticallyReverse()
        break;

      case "done to undone order":
        main.orderDoneToUnDone()
        break;

      case "undone to done order":
        main.orderUnDoneToDone()
        break;
    }
    showFullUpdatedList()
  })
}

function getAllDoneOrUndoneTodos() {
  inquirer.prompt({
    type: 'list',
    name: 'listOptions',
    message: 'do you want to get all done or undone todos?', 
    choices:[
      "get all done todos",
      "get all undone todos",
    ]
  })
  .then(answers => {
    const answer = answers.listOptions
    let todos
    switch(answer){
      case "get all done todos":
        todos = main.getDoneTodos()
        break;

      case "get all undone todos":
        todos = main.getUnDoneTodos()
        break;
    }

    getFullCurrentList(todos)
  })
}

function checkOrUncheckTodo() {
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
        status = main.changeDoneStatus(answers.checkUncheckTodoIndex, true);
      }else if(answersNested.checkUncheckOptions === "uncheck"){
        status = main.changeDoneStatus(answers.checkUncheckTodoIndex,false);
      } 

      if(status === null){
        console.log(chalk.bold.red("invalid index"))
      }
      else{
        const data = main.itemManager.getTodoList()
        getFullCurrentList(data)
      }
    })
  })
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
          "order list",
          "get all done/undone todos",
          "check or uncheck todo", 
      ]
  }
]

inquirer
  .prompt(options)
  .then((answers) => {
      const answer = answers.listOptions
      switch (answer){
        case "get full todo list":
          showFullUpdatedList()
          break;

        case "add todo to the list":
            addTodoToList()
            break;

        case "delete todo from list":
          deleteTodoFromList()
          break;
        
        case "edit todo from list":
          editTodoFromList()
          break;

        case "clear all list":
          clearAllTodosFromList()
          break;

        case "order list":
          orderList()
          break;

        case "get all done/undone todos":
          getAllDoneOrUndoneTodos()
          break;

        case "check or uncheck todo":
          checkOrUncheckTodo()
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
