import { Console } from "console";
import { createWriteStream } from "fs";
import { Command } from "commander";

export const tasksLogger = new Console({
   stdout: createWriteStream("tasks.txt", { flags: "w+" }),
});

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
      tasksLogger.log(task);
   });

program.parse();
