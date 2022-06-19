#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from "chalk";
import { MainCommander } from "./main-commander.js";
import { ItemManagerCommander } from "./item-manager-commander.js";
import { PokemonClient } from "./pokemon-client-commander.js";

const itemManagerCommander = new ItemManagerCommander();
const pokemonClient = new PokemonClient();
const mainCommander = new MainCommander(itemManagerCommander, pokemonClient);

console.log(chalk.yellow('Welcome to TODOOPS!'));

const questions = [
  {
    type: 'list',
    name: 'command',
    message: 'What do you want to do?',
    choices:
      [
        'Get all todos',
        'Add a new todo',
        'Delete an existing todo',
        'Sort todos',
        'Clear all todos',
        'Exit'
      ],
    filter(command) {
      return command.toLowerCase().split(' ')[0];
    },
  },
  {
    type: 'number',
    name: 'index',
    message: 'Choose the index of todo to be deleted',
    when: (answers) => answers.command === 'delete',
    filter(index) {
      return parseInt(index, 10);
    },
  },
  {
    type: 'input',
    name: 'todo',
    message: 'Enter your new todo',
    when: (answers) => answers.command === 'add',
    filter(todo) {
      return todo;
    },
  },
];

function getAnswers() {
  return inquirer.prompt(questions).then(async (answers) => {
    switch(answers.command) {
      case 'get':
        mainCommander.showTodos();
        break;
      case 'add':
        await mainCommander.addTodo(answers.todo);
        break
      case 'delete':
        mainCommander.deleteTodo(answers.index);
        break;
      case 'sort':
        mainCommander.sortTodos();
        break;
      case 'clear':
        mainCommander.clearAllTodos();
        break;
      case 'exit':
        return 'See you later!';
    }
    return getAnswers();
  });
}

getAnswers()
  .then(result => console.log(chalk.yellow(result)))
  .catch((error) => {
    console.log("Error", error);
  });
