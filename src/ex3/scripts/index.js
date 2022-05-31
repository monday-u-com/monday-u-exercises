import inquirer from 'inquirer';
import ItemManager from "./ItemManager.mjs";

class CliApp
{
    constructor()
    {
        this.item_manager = new ItemManager();
        this.questions = {
            get_command_question: {
                name: "command",
                type: "list",
                message: "Hi master what is your command for me:",
                choices: ["Add", "Delete", "Get", "Help"]
            },
            add_task_question: {
                name: "task_text",
                type: "input",
                message: "Enter your todo text:"
            },
            delete_task_question: {
                name: "task_id",
                type: "number",
                message: "Enter your todos id to delete:"
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

    run()
    {
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
                    case "Settings":
                        // add Settings 
                        break;
                }
            });
    }

    AddCommand()
    {
        inquirer
            .prompt([this.questions.add_task_question])
            .then((answer) => AddTaskResolver(answer.task_text));
    }

    DeleteCommand()
    {
        inquirer
            .prompt([this.questions.delete_task_question])
            .then((answer) => DeleteTaskResolver(answer.task_id));
    }

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
            console.log("New todo added successfully");
        }
        catch (error) {
            console.log(error);
        }
    }

    /**
    * gets task id and deletes it from file and array
    * @param {int} task_id 
    */
    async  DeleteTaskResolver(task_id) {
        const delete_task = Promise.resolve(this.item_manager.RemoveTask(task_id));
        await delete_task;
        console.log("Todo was deleted successfully");
    }

    /**
    * gets all the task and prints it
    */
    async  GetTasks() {
        const tasks = this.item_manager.tasks;
        tasks.forEach((task) => {
            if(Number.isInteger(parseInt(task.id)))
                console.log(`Catch ${task.name}`);
            else
                console.log(task.name || task.data);
        });
    }
}

const cli = new CliApp();
cli.init();
cli.run();