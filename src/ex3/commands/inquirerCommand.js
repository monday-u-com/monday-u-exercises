import chalk from "chalk";
import inquirer from "inquirer";
import ItemManager from "../services/itemManager.js";
import { get } from "./showCommand.js";
import { add } from "./addCommand.js";
import { deleteTask } from "./deleteCommand.js";
import { deleteAll } from "./deleteAllCommand.js";

export async function inquire() {
  const itemManager = new ItemManager();
  itemManager.load();
  const itemList = itemManager.itemList;

  inquirer
    .prompt([
      {
        type: "list",
        message: "\n\nPick a task to remove",
        name: "action",
        choices: ["add task", "delete task", "delete list", "get list"],
      },
    ])
    .then((answers) => {
      if (answers.action === "add task") {
        console.log("you chose add task");

        inquirer
          .prompt([
            {
              type: "input",
              message: "\n\nPlease enter the task you would like to add:",
              name: "action",
            },
          ])
          .then((answer) => {
            add(answer.action);
          });
      }

      if (answers.action === "delete task") {
        inquirer
          .prompt([
            {
              type: "input",
              message:
                "\n\nPlease enter the task number you would like to delete:",
              name: "action",
            },
          ])
          .then((answer) => {
            deleteTask(answer.action);
          });
      }
      if (answers.action === "get list") {
        get();
      }
      if (answers.action === "delete list") {
        deleteAll();
      }
    });
}
