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

program.parse();

async function AddTaskResolver(task_text)
{
    const add_task = Promise.resolve(item_manager.AddTask(task_text));
    await add_task;
    // TODO: add to file
    console.log("New todo added successfully");
}

async function DeleteTaskResolver(task_id)
{
    const delete_task = Promise.resolve(item_manager.RemoveTask(task_id));
    await delete_task;
    // TODO: DELETE from file
    console.log(delete_task);
}

async function GetTasks()
{ 
    const tasks = item_manager.tasks;
    tasks.forEach((task) => {
        console.log(task.name || task.data);
    }); 
}
