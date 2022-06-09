
import inquirer from 'inquirer';
import ItemManager from "./ItemManager.mjs";
import { createSpinner } from 'nanospinner';
import figlet from 'figlet';
import gradient from 'gradient-string';
import chalk from 'chalk';
import asciifyImage from 'asciify-image';
import { CLI_NAME, CLI_DESCRIPTION, CLI_BEST_VIEW_INSTRUCTION, CLI_COMMAND_SELECT_MESSAGE, CLI_COMMAND_SELECT_OPTIONS, CLI_ADD_TASK_MESSAGE, CLI_ADD_TASK_VALIDATION_TEXT, CLI_DELETE_TASK_MESSAGE, CLI_DELETE_TASK_VALIDATION_TEXT, CLI_GET_TASKS_WITH_POKEMON_IMAGE, CLI_HELP_QUESTION_MESSAGE, CLI_HELP_INSTRUCTIONS_FIRST_SECTION, CLI_HELP_INSTRUCTIONS_SECOND_SECTION, CLI_YES_NO_OPTIONS } from './Strings.cjs';

export default class CliApp
{
    constructor()
    {
        this.item_manager = new ItemManager();
        this.intro_message = {
            name: CLI_NAME,
            description: CLI_DESCRIPTION,
            best_view_instructions: CLI_BEST_VIEW_INSTRUCTION
        };
        this.questions = {
            get_command_question: {
                name: "command",
                type: "list",
                message: CLI_COMMAND_SELECT_MESSAGE,
                choices: CLI_COMMAND_SELECT_OPTIONS
            },
            add_task_question: {
                name: "task_text",
                type: "input",
                message: CLI_ADD_TASK_MESSAGE,
                validate: function (task_text) {
                    var valid = task_text.length;
                    return valid > 0 || CLI_ADD_TASK_VALIDATION_TEXT;
                  }
            },
            delete_task_question: {
                name: "task_id",
                type: "input",
                message: CLI_DELETE_TASK_MESSAGE,
                validate: function (id) {
                    var valid = Number.isInteger(parseInt(id));
                    return valid || CLI_DELETE_TASK_VALIDATION_TEXT;
                  }
            },
            get_tasks_with_image_art_question: {
                name: "image_art",
                type: "list",
                message: `${new inquirer.Separator()}\n ${CLI_GET_TASKS_WITH_POKEMON_IMAGE}`,
                choices: CLI_YES_NO_OPTIONS
            },
            help_question: {
                name: "help",
                type: "list",
                message: `${new inquirer.Separator()}\n ${CLI_HELP_QUESTION_MESSAGE}`,
                choices: CLI_YES_NO_OPTIONS,
                instructions: CLI_HELP_INSTRUCTIONS_FIRST_SECTION +
                            `${new inquirer.Separator()}\n` +
                            CLI_HELP_INSTRUCTIONS_SECOND_SECTION
            }
        }
    }

    /**
    * init the tasks in items manager
    */
    async init() {
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
    * gets all the task and prints it in order
    */
    async  GetTasks() {
        const tasks = this.item_manager.tasks;
        const promises = [];
        inquirer
        .prompt([this.questions.get_tasks_with_image_art_question])
        .then((answer) => 
        {
            tasks.forEach(async (task, index) => {
                // check if task is pokemon
                if(Number.isInteger(parseInt(task.id)))
                { 
                    if(answer.image_art === "Yes")  
                    {
                        // task images is url need async await to print in order          
                        promises.push(Promise.resolve(this.AsciiArt(task, index)));
                    }
                    else
                        promises.push(Promise.resolve(chalk.bgCyan(`${index + 1} ) Catch ${task.name}`)));
                }
                else
                    promises.push(Promise.resolve(chalk.bgBlue(`${index + 1} ) ` + (task.name || task.data))));
            });
            // wait for all images to parse to ascii art and display them
            Promise.all(promises).then((results) => {
                results.forEach((result) => {
                    console.log(result);
                })
            });
        });        
    }

    /**
     * parse task to title and ascii art
     * @param {Object} task 
     * @param {number} index 
     * @returns text to print in console (title + image)
     */
    async AsciiArt(task, index)
    {
        const ascii_promise = await asciifyImage(task.images.front_default, { fit: 'original' });   
        const console_log_text = figlet.textSync(`${index + 1} ) Catch ${task.name}`) + ascii_promise;    
        return console_log_text;
    }    
}
