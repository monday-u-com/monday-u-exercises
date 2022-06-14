import asciify from "asciify-image";
import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";
import ItemManager from "./item-manager.js";
import PokemonClient from "./pokemon-client.js";

const POKEMON_FILE_NAME = "pokemon-names.json";
const TASKS_FILE_NAME = "tasks.json";
const tasksManager = new ItemManager(render);
const pokemonClient = new PokemonClient();
let allPokemonNames = [];

export async function init() {
   if (!fs.existsSync(TASKS_FILE_NAME)) {
      fs.writeFileSync(TASKS_FILE_NAME, JSON.stringify([]));
   } else {
      const fileData = fs.readFileSync(TASKS_FILE_NAME);
      let fileTasks = JSON.parse(fileData);
      fileTasks.forEach((task) => {
         tasksManager.add(task);
      });
   }

   if (!fs.existsSync(POKEMON_FILE_NAME)) {
      allPokemonNames = await getAllPokemonNames();
      let data = JSON.stringify(allPokemonNames);
      fs.writeFileSync(POKEMON_FILE_NAME, data);
   } else {
      allPokemonNames = JSON.parse(fs.readFileSync(POKEMON_FILE_NAME));
   }

   return tasksManager;
}

async function getAllPokemonNames() {
   const pokemonNames = await pokemonClient.getAllPokemonNames();
   return JSON.stringify(pokemonNames);
}

function render() {
   let data = JSON.stringify(tasksManager.items);
   fs.writeFileSync(TASKS_FILE_NAME, data);
}

export async function chooseTaskToDelete() {
   const answer = await inquirer.prompt({
      name: "delete",
      type: "list",
      message: "Which task would you like to delete?",
      choices: tasksManager.items,
   });
   return tasksManager.items.indexOf(answer.delete);
}

export async function addTask(task) {
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
      console.log(chalk.bgGreen("New todo added successfully"));
   }
}

function pokemonTasksHandle(pokemon, pokemonIDS, i) {
   if (pokemon) {
      let pokemonName = capitalize(pokemon.name);
      const pokemonTypes = capitalize(pokemonClient.getPokemonTypes(pokemon));
      const taskToAdd = `Catch ${pokemonName} of type ${pokemonTypes}`;
      if (tasksManager.items.includes(taskToAdd)) {
         console.log(
            chalk.bgRed(`${pokemonName} already exists in your tasks. Please try another Pokemon.`)
         );
      } else {
         tasksManager.add(taskToAdd);
         printPokemonAscii(pokemon);
         console.log(
            chalk.bgBlueBright(`A wild Pokemon appeared! Catch ${capitalize(pokemon.name)}!`)
         );
         console.log(chalk.bgGreen("New todo added successfully"));
      }
   } else {
      console.log(chalk.bgMagenta(`Pokemon ID ${pokemonIDS[i]} does not exist`));
   }
}

function printPokemonAscii(pokemon) {
   const imageURL = pokemon.sprites.front_default;
   const options = {
      fit: "box",
      width: 50,
      height: 50,
   };

   asciify(imageURL, options, function (err, asciified) {
      console.log(asciified);
   });
}

function capitalize(word) {
   return word.charAt(0).toUpperCase() + word.slice(1);
}
