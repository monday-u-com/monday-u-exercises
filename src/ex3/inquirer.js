/**
 * Pizza delivery prompt example
 * run example by writing `node pizza.js` in your console
 */

import inquirer from 'inquirer';
import chalk from "chalk";

console.log(chalk.yellow('Welcome to TODOOPS!'));

const questions = [
  {
    type: 'list',
    name: 'command',
    message: 'What do you want to do?',
    choices:
      [
        'get all todos',
        'add a new todo',
        'delete an existing todo',
        'sort todos',
        'clear all todos',
        'exit'
      ],
    filter(val) {
      return val.toLowerCase().split(' ')[0];
    },
  },
];

function getAnswers() {
  return inquirer.prompt(questions).then((answers) => {
    if (answers.command !== 'exit') {
      return getAnswers();
    }
    return 'See you later!';
  });
}

getAnswers()
  .then(result => console.log(chalk.yellow(result)))
  .catch((error) => {
    console.log("Error", error);
  });
