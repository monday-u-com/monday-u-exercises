#!/usr/bin/env node
import { Command } from "commander";

import { add } from "./commands/addCommand.js";
import { deleteTask } from "./commands/deleteCommand.js";
import { deleteAll } from "./commands/deleteAllCommand.js";
import { get } from "./commands/showCommand.js";
import {inquire} from "./commands/inquirerCommand.js"
import chalkAnimation from "chalk-animation";
import chalk from "chalk";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function getCommanderProgram() {
  const program = new Command();

  program
    .name("todoApp")

    .description(
      `${chalk.greenBright(
        `A todo app to add/remove tasks or Pokemons!!\nFeel free to add/remove tasks with the commander or with inquirer`
      )}`
    )
    .version("1.0.0");

  program
    .command("add")
    .description("Add task to list")
    .arguments("<string>", "task-name")
    .action((taskName) => {
      add(taskName);
    });

  program
    .command("delete")
    .description("Remove task from list")
    .arguments("<Number>", "task number")
    .action((taskName) => {
      deleteTask(taskName);
    });

    program
    .command("deleteAll")
    .description("Remove all tasks from list")
    .action(() => {
      deleteAll();
    });

  program
    .command("get")
    .description("Show the list")
    .action(() => {
      get();
    });

    program
    .command("inquirer")
    .description("Select actions manually")
    .action(() => {
      inquire();
    });

  return program;
}

async function main() {
  const rainbowTitle = chalkAnimation.rainbow(
    "\nWelcome to Ori's Todo list app! \n"
  );
  await sleep();
  rainbowTitle.stop();
  const program = getCommanderProgram();
  program.parse();
}

try {
  main()
} catch (err) {
  console.error(err)
}
