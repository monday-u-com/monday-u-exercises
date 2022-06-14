#!/usr/bin/env node
import "isomorphic-fetch";
import { Command } from "commander";
import chalk from "chalk";
import chalklet from "chalklet";
import tasksManager from "./task-manager.js";

const colorOptions = {
   type: "string",
   text: { value: "white" },
   bg: { value: "blue" },
};

const program = new Command();

program
   .name(chalklet.generate("Weekend To-Do", colorOptions))
   .description(
      chalk.bgBlueBright(
         "Get your tasks done before the weekend! And catch some Pokemons while you're at it..."
      )
   )
   .version("1.0.0");

program
   .command("add")
   .description("Add a task to your to-do list")
   .argument("<string>", "task")
   .action(async (task) => {
      tasksManager.add(task);
   });

program
   .command("delete")
   .description("Delete a task of your choice")
   .action(async () => {
      await tasksManager.remove();
      console.log(chalk.bgRedBright("Todo deleted successfully"));
   });

program
   .command("clear")
   .description("Clear entire to-do list")
   .action(() => {
      tasksManager.clear();
      console.log(chalk.red.bgGreen("All tasks cleared"));
   });

program
   .command("get")
   .description("Get entire to-do list")
   .action(() => {
      tasksManager.getTasks().forEach((task) => {
         console.log(chalk.bgCyan(task));
      });
   });

program
   .command("sort")
   .description("Sort the To-Do list up or down")
   .argument("<string>", "direction")
   .action((direction) => {
      if (direction === "up") {
         tasksManager.sort("up");
      } else if (direction === "down") {
         tasksManager.sort("down");
      } else {
         console.log(chalk.bgRed("Unfamiliar direction argument. Please type up or down"));
      }
   });

program.parse();
