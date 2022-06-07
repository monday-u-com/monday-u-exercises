#!/usr/bin/env node
import { Command } from "commander";
import TodoManager from "./todo-manager.js";
import inquirer from "./inquirer.js";
import chalk from 'chalk';


class TodoCommander {
    PURPLE = chalk.hex('#9D00AB');
    ORENGE = chalk.hex('FC652C');

    TODOS = {
        POKEMON: "pokemon",
        TASK: "text",
        NOT_FOUND: "not-found",
        ALL: "all"
    };

    SORT = {
        ASC: "asc",
        DESC: "desc",
        DEF: "def"
    };

    TODO_OPTION_DESCRIPTION =
        "Todo option - either p for pokemons or t for tasks";
    SORT_OPTION_DESCRIPTION =
        "Sort option - either asc for ascending or desc for descending";
    DELETE_ALL_OPTION_DESCRIPTION =
        "Delete-all option - all todos, or all pokemon or all tasks";

    constructor() {
        this.todoManager = new TodoManager;
        this.programCommand = new Command();
    }

    run() {
        this.prepareCommanderProgram();
        this.parseProgram();
    }

    prepareCommanderProgram() {

        this.programCommand
            .name("cli-todo-app")
            .description("Use the todo app to manage up your pokemons and todo list!")
            .version("1.0.0");

        //read
        this.programCommand
            .command("get")
            .description("Displays the todo list")
            .option("-f, --filter <string>", this.TODO_OPTION_DESCRIPTION, this.TODOS.ALL)
            .option("-s, --sort <string>", this.SORT_OPTION_DESCRIPTION, this.SORT.DEF)
            .action((options) => {
                this.todoManager.render(options);
            });

        //write
        this.programCommand
            .command("add")
            .description("Write your todos or pokemons to the todo list")
            .argument("<string>", "todo")
            .action(async (todo) => {
                const todoStatus = await this.todoManager.addTodo(todo);
                todoStatus.duplicates && console.log(this.PURPLE(todoStatus.duplicates));
                todoStatus.todo && console.log(chalk.green(todoStatus.todo));
            });

        //delete
        this.programCommand
            .command("delete")
            .description("Delete a single todo by index")
            .argument("<number>", "index")
            .action((index) => {
                if (this.todoManager.handleDeleteTodo(index)) {
                    console.log(chalk.green(`Todo[${chalk.bold(index)}] deleted successfully`));
                } else {
                    console.log(chalk.red(`index(${chalk.bold(index)}) is out of bounds`));
                }
            });

        //delete-pokemon
        this.programCommand
            .command("delete-pokemon")
            .description("Delete a single pokemon todo by pokemon ID or name")
            .argument("<string>", "pokemon")
            .action((pokemon) => {
                if (this.todoManager.handleDeletePokemonTodos(pokemon)) {
                    console.log(chalk.green(`pokemon ${chalk.bold(pokemon)} deleted successfully`));
                } else {
                    console.log(chalk.red(`pokemon ${chalk.bold(pokemon)} was not found`));
                }
            });

        //delete-not-found
        this.programCommand
            .command("delete-not-found")
            .description("Delete all not found pokemons todos")
            .action((options) => {
                this.todoManager.handleDeleteAllTodos(options.remove);
                const removeType = (options.remove == 'all') ? '' : options.remove;
                console.log(chalk.green(`All ${chalk.bold(removeType)} not-found todos deleted successfully`));
            });

        //delete-all
        this.programCommand
            .command("delete-all")
            .description("Delete all todos by group type")
            .option("-r --remove <string>", this.DELETE_ALL_OPTION_DESCRIPTION, this.TODOS.ALL)
            .action(() => {
                this.todoManager.handleDeleteAllTodos(this.TODOS.NOT_FOUND);
                console.log(chalk.green(`All ${chalk.bold(removeType)} todos deleted successfully`));
            });

        //pending-tasks
        this.programCommand
            .command("pending-tasks")
            .description("Show your pending tasks")
            .action(() => {
                const pendingTasks = this.todoManager.getPendingTodos();
                console.log(this.ORENGE(`You have ${chalk.bold(pendingTasks)} pending tasks`));
            });

        //show-pokemon-image
        this.programCommand
            .command("show-pokemon-image")
            .description("Show pokemon's image by pokemon ID or name")
            .argument("<string>", "pokemon")
            .action((pokemon) => {
                if (!this.todoManager.handleShowPokemonImage(pokemon)) {
                    console.log(chalk.red(`pokemon ${chalk.bold(pokemon)} was not found`));
                }
            });

        //interactive
        this.programCommand
            .command('interactive')
            .description("Use interactive menu")
            .action(() => inquirer());

        return this.programCommand;
    }

    parseProgram() {
        this.programCommand.parse();
    }

}

const todoCommander = new TodoCommander;
todoCommander.run();