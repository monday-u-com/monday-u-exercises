import chalk from 'chalk';
import { Command } from 'commander';
import { addItem, addOnlyPokemons, removeItem, printTasks, removeAll } from './ItemManager.js';
import * as fs from 'fs';

const program = new Command();

function addTask(args,options) {

  if(options.pokemons){
    addPokemons(args);
  }else if(options.multiple){
    addTasks(args);
  }else{
    addItem(args);
  }
}

function addTasks(args) {
  const tasks = args.split(',');
  tasks.forEach((task) => {
    addItem(task);
  });
}

function addPokemons(args) {
  const pokemons = args.split(',');
  addOnlyPokemons(pokemons);
}

function removeTask(args) {
  if(args === '*'){
    removeAll();
    return;
  }
  const tasksIdxs = args.split(',');
  tasksIdxs.forEach((idx) => {
    removeItem(idx);
  });
}

function get() {
  printTasks();
}

program
  .command('add')
  .description('add a new task')
  .argument('<string> or <number>', 'task value')
  .option("-m, --multiple","Multiple tasks seperated by comma")
  .option("-p,--pokemons", "Add a list of pokemons by id or name")
  .addHelpText('before','Add a task or a pokemon id')
  .action(addTask);

program
  .command('remove')
  .description('remove a task')
  .argument('<number> or * for removing all', 'task index')
  .addHelpText('before','insert zero based index to remove the task from')
  .action(removeTask);

program
.command('get')
.description('get all tasks')
.action(get);


program.showHelpAfterError('(add --help for additional information)');

program.parse();
