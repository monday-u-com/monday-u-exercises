#!/usr/bin/env node

import inquirer from 'inquirer';

import {
  showFullUpdatedList,
  addTodoToList,
  deleteTodoFromList,
  clearAllTodosFromList,
  editTodoFromList,
  orderList,
  checkOrUncheckTodo,
  getAllDoneOrUndoneTodos,
  displayPokemon
} from './cli-methods.js'

const options = [
  {
      type: "list",
      name: "listOptions",
      message: "What you want to do in your list",
      choices: [
          "get full todo list",
          "add todo to the list",
          "delete todo from list",
          "edit todo from list (for normal todo)",
          "clear all list",
          "order list",
          "get all done/undone todos",
          "check or uncheck todo", 
          "display pokemon",
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
        
        case "edit todo from list (for normal todo)":
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
        
        case "display pokemon":
          displayPokemon()
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
