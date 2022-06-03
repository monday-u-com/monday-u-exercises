#!/usr/bin/env node
import fs from "fs";
import "isomorphic-fetch";
import { Command } from "commander";
import ItemManager from "../app/item-manager.mjs";
import PokemonClient from "../app/pokemon-client.mjs";

const FILE_NAME = "tasks.json";
const fileData = fs.readFileSync(FILE_NAME);
let fileTasks = JSON.parse(fileData);

const tasksManager = new ItemManager(render);
fileTasks.forEach((task) => {
   tasksManager.add(task);
});

const pokemonClient = new PokemonClient();

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
      tasksManager.add(task);
      console.log("New todo added successfully");
   });

program
   .command("addp")
   .description("Add a task to your to-do list")
   .argument("<string>", "task")
   .action(async (task) => {
      const pokemonName = await pokemonClient.getPokemon(task);
      tasksManager.add(pokemonName.name);
      console.log("New todo added successfully");
   });

program
   .command("delete")
   .description("Delete task of index i")
   .argument("<number>", "index")
   .action((index) => {
      tasksManager.remove(index);
      console.log("Todo deleted successfully");
   });

program
   .command("clear")
   .description("Delete entire to-do list")
   .action(() => {
      tasksManager.clear();
      console.log("All tasks cleared");
   });

program
   .command("get")
   .description("Get entire to-do list")
   .action(() => {
      tasksManager.items.forEach((item) => {
         console.log(item);
      });
   });

program.parse();

function render() {
   let data = JSON.stringify(tasksManager.items);
   fs.writeFileSync(FILE_NAME, data);
}
