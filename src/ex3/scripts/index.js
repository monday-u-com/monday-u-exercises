import { Command } from "commander";
import ItemManager from "./ItemManager.mjs";

const program = new Command();
const item_manager = new ItemManager();

program
    .name("todo-cli")
    .description("The best cli for a todo app")
    .version("1.0.0");

program
    .command("add")
    .description("Adds a task to todo list")
    .argument("<string>", "Task text")
    .action((task_text) => AddTaskResolver(task_text));

program
    .command("delete")
    .description("Deletes a task to todo list")
    .argument("<number>", "Task id")
    .action((task_id) => DeleteTaskResolver(task_id));

program
    .command("get")
    .description("Gets all tasks in todo list")
    .action(() => GetTasks());

init();

/**
 * gets string from cli add sends it to item manager
 * @param {string} task_text string from user input
 */
async function AddTaskResolver(task_text)
{
    try
    {
        const add_task = Promise.resolve(item_manager.AddTask(task_text));
        await add_task;
        console.log("New todo added successfully");
    }
    catch(error)
    {
        console.log(error);
    }
}

/**
 * gets task id and deletes it from file and array
 * @param {int} task_id 
 */
async function DeleteTaskResolver(task_id)
{
    const delete_task = Promise.resolve(item_manager.RemoveTask(task_id));
    await delete_task;
    console.log(delete_task);
}

/**
 * gets all the task and prints it
 */
async function GetTasks()
{ 
    const tasks = item_manager.tasks;
    tasks.forEach((task) => {
        console.log(task.name || task.data);
    }); 
}

/**
 * init the tasks in items manager
 */
async function init()
{
    const set_array_promiss = await item_manager.SetArrayFromFile();
    program.parse();
}
