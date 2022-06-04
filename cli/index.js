#!/usr/bin/env node
import fs from "fs";
import "isomorphic-fetch";
import { Command } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import ItemManager from "../app/item-manager.mjs";
import PokemonClient from "../app/pokemon-client.mjs";

const POKEMON_FILE_NAME = "pokemon-names.json";
const TASKS_FILE_NAME = "tasks.json";
const tasksManager = new ItemManager(render);
if (!fs.existsSync(TASKS_FILE_NAME)) {
   fs.writeFileSync(TASKS_FILE_NAME, JSON.stringify([]));
} else {
   const fileData = fs.readFileSync(TASKS_FILE_NAME);
   let fileTasks = JSON.parse(fileData);
   fileTasks.forEach((task) => {
      tasksManager.add(task);
   });
}

const pokemonClient = new PokemonClient();

let allPokemonNames = [];
if (!fs.existsSync(POKEMON_FILE_NAME)) {
   allPokemonNames = await getAllPokemonNames();
   let data = JSON.stringify(allPokemonNames);
   fs.writeFileSync(POKEMON_FILE_NAME, data);
} else {
   allPokemonNames = JSON.parse(fs.readFileSync(POKEMON_FILE_NAME));
}

async function getAllPokemonNames() {
   const pokemonNames = await pokemonClient.getAllPokemonNames();
   return JSON.stringify(pokemonNames);
}

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
   .action(async (task) => {
      addTask(task);
   });

program
   .command("delete")
   .description("Delete task of index i")
   .action(async () => {
      const index = await chooseTaskToDelete();
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
   fs.writeFileSync(TASKS_FILE_NAME, data);
}

async function chooseTaskToDelete() {
   const answer = await inquirer.prompt({
      name: "delete",
      type: "list",
      message: "Which task would you like to delete?",
      choices: tasksManager.items,
   });
   return tasksManager.items.indexOf(answer.delete);
}

async function addTask(task) {
   if (
      task
         .replace(/\s/g, "")
         .split(",")
         .every((elem) => !isNaN(elem) || allPokemonNames.includes(elem))
   ) {
      let pokemonIDS = task.replace(/\s/g, "").split(","); // "1, 2, 3" => [1,2,3]
      const pokemonData = await Promise.all(pokemonIDS.map((id) => pokemonClient.getPokemon(id)));
      pokemonData.forEach((pokemon, i) => {
         pokemonTasksHandle(pokemon, pokemonIDS, i);
      });
   } else {
      tasksManager.add(task);
      console.log("New todo added successfully");
   }
}

function pokemonTasksHandle(pokemon, pokemonIDS, i) {
   if (pokemon) {
      let pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      const pokemonTypes = pokemonClient.getPokemonTypes(pokemon);
      const taskToAdd = `Catch ${pokemonName} of type ${pokemonTypes}`;
      if (tasksManager.items.includes(taskToAdd)) {
         console.log(`${pokemonName} already exists in your tasks. Please try another Pokemon.`);
      } else {
         tasksManager.add(taskToAdd);
         console.log("New todo added successfully");
      }
   } else {
      console.log(`Pokemon ID ${pokemonIDS[i]} does not exist`);
   }
}
