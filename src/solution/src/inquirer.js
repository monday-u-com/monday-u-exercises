import inquirer from 'inquirer';
import chalk from 'chalk';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { EVENT_INTERRUPTED_SYMBOL, InterruptedPrompt } from './inquirer-interrupters.js';
import TodoManager from "./todo-manager.js";

// For all default prompts
InterruptedPrompt.replaceAllDefaults(inquirer)

// For plugin prompts
inquirer.registerPrompt('autocomplete', InterruptedPrompt.from(inquirerPrompt));

const todoManager = new TodoManager;

function addTodoPrompt() {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'add-todo-input',
                message: 'Add new Todo:'
            },
        ])
        .then((answers) => {
            const todo = answers['add-todo-input'];
            return todoManager.addTodo(todo);
        })
        .catch(() => { });
}

async function showAllTodos() {
    const items = await todoManager.getItems({ filter: 'all', sort: 'def' });
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'todo-items',
                message: 'Todo Items:',
                choices: items.map((item, index) => ({
                    value: item.item,
                    name: `${index + 1}) ${item.message}`
                }))
            },
        ])
        .then(async (answers) => {
            const selectedItem = items.find(i => i.item == answers['todo-items']);
            return itemMenuPrompt(selectedItem);
        })
        .catch(() => { });
}

function itemMenuPrompt(item) {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'item-menu',
                message: `Options for ${item.message}`,

                choices: [
                    item.type == 'pokemon' ? null : {
                        value: 'edit_todo',
                        name: 'Edit Todo'
                    },
                    item.type != 'pokemon' ? null : {
                        value: 'show_image',
                        name: 'Show Pokemon Image'
                    },
                    {
                        value: 'delete_todo',
                        name: 'Delete Todo'
                    }
                ].filter(Boolean)
            },
            {
                type: 'expand',
                name: 'confirm',
                message: 'Confirm Action?',
                choices: [{
                    key: 'y',
                    name: 'Yes'
                },
                {
                    key: 'n',
                    name: 'No'
                }]
            },
        ])
        .then(async (answers) => {
            const isConfirmed = answers.confirm == 'Yes';
            const selectedOption = answers['item-menu'];
            if (!isConfirmed) {
                return itemMenuPrompt(item);
            }
            switch (selectedOption) {
                case 'edit_todo': {
                    return editTodoPrompt(item);
                }
                case 'delete_todo': {
                    return todoManager.removeItem(item);
                }
                case 'show_image': {
                    todoManager.showPokemonImage(item);
                    return itemMenuPrompt(item);
                }
            }
        })
        .catch(() => { });
}

function editTodoPrompt(item) {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'edit-todo',
                message: `Edit Todo ${item.item}`
            },
        ])
        .then((answers) => {
            const todo = answers['edit-todo'];
            return todoManager.editTodo(item, todo);
        })
        .catch(() => { });
}

function mainPrompt() {
    let isInterrupted = false;
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'menu-list',
                message: chalk.yellow('Please choose an action or press <Esc> to go back'),
                choices: [
                    {
                        value: 'add_todo',
                        name: 'Add Todo'
                    },
                    {
                        value: 'show_all',
                        name: 'Show All Todos'
                    }
                ],
            },
        ])
        .then((answers) => {
            const selectedOption = answers['menu-list'];
            switch (selectedOption) {
                case 'add_todo': {
                    return addTodoPrompt();
                }
                case 'show_all': {
                    return showAllTodos();
                }
            }
        })
        .catch((e) => {
            if (e == EVENT_INTERRUPTED_SYMBOL) {
                isInterrupted = true;
            }
        })
        .finally(() => !isInterrupted && mainPrompt());
}

export default mainPrompt;