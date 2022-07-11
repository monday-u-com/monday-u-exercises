import { Command } from "commander";
import { ItemManager } from "./itemManager.js"
import fetch from "node-fetch";

const itemManager = new ItemManager();
const TASK_LIST_IS_EMPTY = "Task list is empty";

async function addTask(taskText) {
  if (_isNumbers(taskText)) {
    const numbersList = taskText.split(',');
    await itemManager.addCatchPokemonTask(numbersList);
    return numbersList;
  }
  else {
    itemManager.addPlainTextTask(taskText);
    return false;
  }
}

function _isNumbers(input) {
  const arr = input.split(',');
  return arr.every((item) => {
    return !isNaN(item);
  })
}

async function getAsciiPaints() {
  const URL = `https://raw.githubusercontent.com/vsoch/pokemon-ascii/master/pokemon/database/pokemons.json`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

function isEmptyList(list) {
  return list.length === 1 && list[0] == "";
}

function getCommanderProgram() {
  const program = new Command();

  program
    .name("TODO-app")
    .description("Use the TODO app to manage your tasks like a pro!")
    .version("1.0.0");

  program
    .command("add")
    .description("Add task to tasks list")
    .argument("<string>", "task description")
    .action(async (taskDescription) => {
      const taskRes = await addTask(taskDescription);
      if (taskRes) { //pokemons numbers
        try {
          const asciiFile = await getAsciiPaints();
          taskRes.forEach(pokemon => {
            const { name, ascii } = asciiFile[pokemon];
            console.log("\npokemon name: ", name);
            console.log("\n", ascii);
            console.log("\n");
          })
        }
        catch (err) {
          console.log("Ascii paint not available");
        }
      }
    });

  program
    .command("get")
    .description("Get the tasks list")
    .action(() => {
      const taskList = itemManager._getTaskList();
      if (taskList[0] != '') { // handling empty file scenario
        taskList.forEach((task, index) => {
          console.log(index, " - ", task);
        });
      }
      else {
        console.log(TASK_LIST_IS_EMPTY);
      }
    });

  program
    .command("delete")
    .description("Delete task by index")
    .argument("[numbers...]", "tasks indexs")
    .option('-a, --all', "delete all tasks")
    .action((taskIndex, options) => {
      if (options.all) {
        itemManager.removeAllTasks();
      }
      else {
        const taskList = itemManager._getTaskList();
        if (!isEmptyList(taskList)) {
          taskIndex.forEach(task => {
            itemManager.removeTask(taskList[task]); // modified to use the original 'removeTask' function
          });
        }
        else {
          console.log(TASK_LIST_IS_EMPTY);
        }
      }
    });
  return program;
}

const program = getCommanderProgram();
program.parse();