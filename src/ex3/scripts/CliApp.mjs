
import inquirer from 'inquirer';
import ItemManager from "./ItemManager.mjs";
import { createSpinner } from 'nanospinner';
import figlet from 'figlet';
import gradient from 'gradient-string';
import chalk from 'chalk';
import asciifyImage from 'asciify-image';

export default class CliApp
{
    constructor()
    {
        this.item_manager = new ItemManager();
        this.intro_message = {
            name: "The Best Todo list cli",
            description: "This is a cli for a todo list go a head and check it out.",
            best_view_instructions: "Open console/terminal in full screen for the best user experience!!!"
        };
        this.questions = {
            get_command_question: {
                name: "command",
                type: "list",
                message: "Hi master what is your command for me:",
                choices: ["Add", "Delete", "Get", "Help", "Exit"]
            },
            add_task_question: {
                name: "task_text",
                type: "input",
                message: "Enter your todo text:",
                validate: function (task_text) {
                    var valid = task_text.length;
                    return valid > 0 || `Please enter a valid string`;
                  }
            },
            delete_task_question: {
                name: "task_id",
                type: "input",
                message: "Enter your todos id to delete:",
                validate: function (id) {
                    var valid = Number.isInteger(parseInt(id));
                    return valid || `Please enter a valid id number`;
                  }
            },
            get_tasks_with_image_art_question: {
                name: "image_art",
                type: "list",
                message: `${new inquirer.Separator()}\n Do you want to get tasks with image art:`,
                choices: ["Yes", "No"]
            },
            help_question: {
                name: "help",
                type: "list",
                message: `${new inquirer.Separator()}\n Do you want to execute a command:`,
                choices: ["Yes", "No"],
                instructions: `Hello user this is a todo cli.\n` +
                            `The usage is very simple and contains 1-2 steps (depending on the command you wish to use).\n` +
                            `First you need to select a base command from the list that is presented to you,\n` +
                            `Use the arrows up/down to change your selection once you are happy with your selection use Enter key to confirm it.\n` +
                            `${new inquirer.Separator()}\n` +
                            `List of command:\n` +
                            `   Add - adds a todo to the app.\n` +
                                    `      Usage: todo of type <string>.\n` +
                                    `      Example: "Clean the kitchen", "1,2,3" (get pokemons), "55" (get pokemon)\n\n` + 
                            `   Delete - deletes a todo from the app.\n` +
                                    `      Usage: todo id of type <number>.\n` +
                                    `      Example: 1\n\n` +
                            `   Get - Gets all todo in the app.\n` +
                                    `      Usage: no additional input required\n\n` +
                            `   Help - Shows this message.\n`
            }
        }
    }

    /**
    * init the tasks in items manager
    */
    async  init() {
        await this.item_manager.SetArrayFromFile();
    }
    /**
     * run the cli cycle
     */
    async run()
    {
        this.PrintIntroMessage();
        inquirer
            .prompt([this.questions.get_command_question])
            .then((answer) => {
                switch (answer.command) {
                    case "Add":
                        this.AddCommand();
                        break;
                    case "Delete":
                        this.DeleteCommand();
                        break;
                    case "Get":
                        this.GetTasks();
                        break;
                    case "Help":
                        this.HelpCommand();
                        break;
                    case "Exit":
                        console.log(gradient.instagram.multiline(figlet.textSync("good bye!!!")));
                        // exit cli with success code
                        process.exit(0);
                }
            });
    }
    /**
     * show intro message 
     */
    async PrintIntroMessage()
    {
        console.log(gradient.pastel.multiline(figlet.textSync(this.intro_message.name)));
        console.log(chalk.hex('#63e500')(this.intro_message.description));
        console.log(chalk.hex('#ab0000').bold(this.intro_message.best_view_instructions));
    }
    /**
     * handle add task command
     */
    AddCommand()
    {        
        inquirer
            .prompt([this.questions.add_task_question])
            .then(async (answer) => 
            {
                const spinner = createSpinner('Processing your todo...').start();
                const result = await this.AddTaskResolver(answer.task_text);
                if(typeof result === "boolean")
                    spinner.success({ text: "New todo was added." });
                else
                    spinner.error({ text: result });
            });
    }
    /**
     * handle delete command
     */
    DeleteCommand()
    {
        inquirer
            .prompt([this.questions.delete_task_question])
            .then(async (answer) => 
            {
                const spinner = createSpinner('Deleting your todo...').start();
                const result = await this.DeleteTaskResolver(answer.task_id);
                if(typeof result === "boolean")
                    spinner.success({ text: "The todo was deleted." });
                else
                    spinner.error({ text: result });
            });
    }
    /**
     * handle help command
     */
    HelpCommand()
    {
        console.clear();
        console.log(this.questions.help_question.instructions);
        inquirer
            .prompt([this.questions.help_question])
            .then((answer) => answer.help === "Yes" ? this.run() : process.exit(0));
    }

    /**
    * gets string from cli add sends it to item manager
    * @param {string} task_text string from user input
    */
    async AddTaskResolver(task_text) {
        try {
            const add_task = Promise.resolve(this.item_manager.AddTask(task_text));
            await add_task;
            return true;
        }
        catch (error) {
            return error;
        }
    }

    /**
    * gets task id and deletes it from file and array
    * @param {int} task_id 
    */
    async  DeleteTaskResolver(task_id) {
        try{
            const delete_task = Promise.resolve(this.item_manager.RemoveTask(task_id));
            await delete_task;
            return true;
        }
        catch (error) {
            return error;
        }
    }

    /**
    * gets all the task and prints it
    */
    async  GetTasks() {
        const tasks = this.item_manager.tasks;
        inquirer
        .prompt([this.questions.get_tasks_with_image_art_question])
        .then((answer) => 
        {
            tasks.forEach((task) => {
                if(Number.isInteger(parseInt(task.id)))
                { 
                    if(answer.image_art === "Yes")               
                        asciifyImage(task.images.front_default, { fit: 'original' }, (error, converted) =>
                            {
                                console.log(figlet.textSync(`Catch ${task.name}`));
                                console.log(error || converted);
                            });
                    else
                        console.log(`Catch ${task.name}`);
                }
                else
                    console.log(task.name || task.data);
            });
        });
    }
}
