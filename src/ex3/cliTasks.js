import chalk from "chalk";
import { Command } from "commander";
import { ItemManage_CLI } from "./ItemManager_cli.js";

const program = new Command();
const itemManager = new ItemManage_CLI();

program
  .name("cli-tasks")
  .version("1.0.0")
  .description("CLI tasks manager for ex3");

program
  .command("add")
  .alias("a")
  .description("Add new task")
  .argument("<task>", "Task to add")
  .action(async (taskInput) => {
    const isCompleted = false;
    const isAdded = await itemManager.addTask(taskInput, isCompleted);
    if (isAdded) {
      console.log(chalk.green("Task added"));
    } else {
      console.log(chalk.red("Task not added"));
    }
  });

program
  .command("complete")
  .alias("c")
  .description("Complete task")
  .argument("<task ID>", "Task id to complete")
  .action((taskID) => {
    itemManager.toggleCompleted(taskID);
  });

program
  .command("uncomplete")
  .alias("u")
  .description("Uncomplete task")
  .argument("<task ID>", "Task id to uncomplete")
  .action((taskID) => {
    itemManager.toggleCompleted(taskID);
  });

program
  .command("list")
  .alias("ls")
  .description("List all tasks")
  .option("-c, --completed", "Show completed tasks")
  .option("-u, --uncompleted", "Show uncompleted tasks")
  .option("-a, --all [all]", "Show all tasks")
  .action((options) => {
    let isTasksToShow = false;
    if (options.completed) {
      itemManager.getTasks().forEach((task, index) => {
        if (task.isCompleted) {
          console.log(`${index + 1}. ${task.content}`);
          isTasksToShow = true;
        }
      });
    } else if (options.uncompleted) {
      itemManager.getTasks().forEach((task, index) => {
        if (!task.isCompleted) {
          console.log(`${index + 1}. ${task.content}`);
          isTasksToShow = true;
        }
      });
    } else {
      itemManager.getTasks().forEach((task, index) => {
        console.log(`${index + 1}. ${task.content}`);
        isTasksToShow = true;
      });
    }
    if (!isTasksToShow) {
      console.log(chalk.red("No tasks to show"));
    }
  });

program
  .command("delete")
  .alias("d")
  .description("Delete task")
  .argument("<task ID>", "Task id to delete")
  .action((taskID) => {
    const isRemoved = itemManager.removeTask(taskID);
    if (isRemoved) {
      console.log(chalk.green("Task removed"));
    } else {
      console.log(chalk.red("Task not removed"));
    }
  });

program.parse();
