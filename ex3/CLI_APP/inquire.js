import inquirer from "inquirer";
import {addTodo,showTodos,deleteTodo,} from "./itemManager.js"


export default async function inquire() {
 

  inquirer
    .prompt([
      {
        type: "list",
        message: "\n\nPick a task to remove",
        name: "Action",
        choices: ["add task", "remove task", "show list"],
      },
    ])
    .then((answers) => {
      if (answers.Action === "add task") {
        console.log("you chose add task");
        addTodo();
      }

      if (answers.Action === "remove task") {
        console.log("you chose remove task");
        deleteTodo();
      }
      if (answers.Action === "show list") {
        console.log("you chose show list");
        showTodos()

      }
    });
}
