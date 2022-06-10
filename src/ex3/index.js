import { Command } from 'commander';
import Inquirer from 'inquirer';
import * as ItemManager from './ItemManager.js';

const program = new Command();

function addTasksCli(args,options) {
  const tasks = args.split(',');
  if (options.pokemons) {
     ItemManager.addPokemons(tasks);
  }else{
    addTasks(tasks);
  }
}

function addTasks(tasks){
  tasks.forEach((task) => {
    if (!isNaN(task)) {
      ItemManager.addPokemon(task);
    } else {
      ItemManager.addTodo(task);
    }
  });
}

function removeTask(args) {
  if (args === '*') {
    ItemManager.removeAll();
    return;
  }
  const tasksIdxs = args.split(',');
    ItemManager.removeItem(tasksIdxs);
}

function startInquier() {
  Inquirer.prompt([
    {
      type: 'rawlist',
      name: 'action',
      message: 'Hello! what would you like to do?',
      choices: [
        'Add a new Task',
        'Catch pokemons',
        'Remove a task',
        'See all the tasks',
        'quit',
      ],
    },
    {
      type: 'input',
      name: 'add',
      message: "Enter one or more items seperated by ','\n",
      when(answers) {
        return answers.action === 'Add a new Task';
      },
    },
    {
      type: 'input',
      name: 'pokemon',
      message: 'Enter one or more pokemons ids/names\n',
      when(answers) {
        return answers.action === 'Catch pokemons';
      },
    },
    {
      type: 'input',
      name: 'remove',
      message: "Enter one or more indices to remove seperated by ','\n",
      when(answers) {
        return answers.action === 'Remove a task';
      },
    },
  ]).then((answers) => {
    if (answers.add) {
      addTasks(answers.add.split(','));
    } else if (answers.pokemon) {
      ItemManager.addPokemons(answers.pokemon.split(','));
    } else if (answers.remove) {
      removeTask(answers.remove);
    } else if (answers.action === 'See all the tasks') {
      ItemManager.printTasks();
    } else{
      return;
    }
  }).catch((err) => {
    console.log(err);
});
}

program
  .command('add')
  .description('add a new task')
  .argument('<string> or <number>', 'task value')
  .option('-p,--pokemons', 'Add a list of pokemons by id or name')
  .addHelpText('before', 'Add a task or a pokemon id')
  .action(addTasksCli);

program
  .command('remove')
  .description('remove a task')
  .argument('<number> or * for removing all', 'task index')
  .addHelpText('before', 'insert zero based index to remove the task from')
  .action(removeTask);

program
  .command('get')
  .description('get all tasks')
  .action(ItemManager.printTasks);

program.command('inquier').description('work with inquirer').action(startInquier);

program.parse();
