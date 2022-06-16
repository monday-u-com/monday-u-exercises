import { Command } from "commander";
import { addTodo , getTodo , deleteTodo , createListTodo , deleteAllTodo} from "./utils.js";

await createListTodo();

function getCommanderProgram(){
  const program = new Command();

  program
    .name("todo-app")
    .description("Use the Todo app to update tasks!")
    .version("1.0.0");

  program
    .command("add")
    .description("Add a todo to list task")
    .argument("<string>", "todo")
    .option("-c, --color <string>", "Result color", "white")
    .action((todo,options) => {
      addTodo(todo,options);
    });

  program
    .command("get")
    .description("get a list task")
    .option("-c, --color <string>", "Result color", "white")
    .action((options) => {
      getTodo(options);
    });  

  program
    .command("delete")
    .description("Delete a task")
    .argument("<string>", "id")
    .option("-c, --color <string>", "Result color", "white")
    .option("-d, --deleteName <string>", CHOICE_ARG_DESCRIPTION, CHOICE.ID)
    .action((id,options) => {
      deleteTodo(id,options);
    });
    
  program
    .command("delete-all")
    .description("Delete list task")
    .option("-c, --color <string>", "Result color", "white")
    .action((options) => {
      deleteAllTodo(options);
    });

  return program;
}
const program = getCommanderProgram();
program.parse();
