import fs from "fs";
import { Command } from "commander";

const FILE_NAME = "tasks.json";
const fileData = fs.readFileSync(FILE_NAME);
let tasks = JSON.parse(fileData);

const program = new Command();

program
   .name("Weekend To-Do")
   .description(
      "Get your tasks done before the weekend! And catch some Pokemons while you're at it..."
   )
   .version("1.0.0");

program
   .command("add")
   .description("Add a task to your to-do list")
   .argument("<string>", "task")
   .action((task) => {
      tasks.push(task);
      let data = JSON.stringify(tasks);
      fs.writeFile(FILE_NAME, data, (error) => {
         if (error) {
            console.log("An error has occurred ", error);
            return;
         }
      });
   });

program.parse();
