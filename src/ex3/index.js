import chalk from "chalk";
import { Command } from "commander";
const program = new Command();


program
  .name("todolist")
  .description("The best weather calculator")
  .version("1.0.0");

program
  .command("get-temp")
  .description("get temperature")
  .argument("<string>", "give city temperature")
  .option("-c, --color <string>", "Result color", "white")
  .option("-s, --scale <string>", "unix", "c")
  .action(() => {
    console.log(
      chalk[options.color](
        `hello world`
      )
    );
  });

program.parse();