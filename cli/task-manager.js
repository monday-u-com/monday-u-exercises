import asciify from "asciify-image";
import inquirer from "inquirer";
import chalk from "chalk";
import pokemonClient from "../server/clients/pokemon-client.mjs";
import file from "./file-manager.js";

class TaskManager {
   getTasks = () => file.getAllTasks();

   async add(task) {
      const allPokemonNames = await file.getFilePokemonNames();
      if (
         task
            .replace(/\s/g, "")
            .split(",")
            .every((elem) => !isNaN(elem) || allPokemonNames.includes(elem))
      ) {
         let pokemonIDS = task.replace(/\s/g, "").split(","); // "1, 2, 3" => [1,2,3]
         const pokemonData = await Promise.all(
            pokemonIDS.map((id) => pokemonClient.getPokemon(id))
         );
         pokemonData.forEach((pokemon, i) => {
            this._pokemonTasksHandle(pokemon, pokemonIDS, i);
         });
      } else {
         file.addTask(task);
         console.log(chalk.bgGreen("New todo added successfully"));
      }
   }

   remove = async () => file.deleteTask(await this._chooseTaskToDelete());

   clear = () => file.clearTasks();

   sort(direction) {
      let sortedTasks;
      if (direction === "down") {
         sortedTasks = this.getTasks().sort();
      } else {
         sortedTasks = this.getTasks().sort().reverse();
      }
      file.clearTasks();
      sortedTasks.forEach((task) => file.addTask(task));
   }

   _pokemonTasksHandle(pokemon, pokemonIDS, i) {
      if (pokemon) {
         let pokemonName = this._capitalize(pokemon.name);
         const pokemonTypes = this._capitalize(pokemonClient.getPokemonTypes(pokemon));
         const taskToAdd = `Catch ${pokemonName} of type ${pokemonTypes}`;
         if (file.getAllTasks().includes(taskToAdd)) {
            console.log(
               chalk.bgRed(
                  `${pokemonName} already exists in your tasks. Please try another Pokemon.`
               )
            );
         } else {
            file.addTask(taskToAdd);
            this._printPokemonAscii(pokemon);
            console.log(
               chalk.bgBlueBright(
                  `A wild Pokemon appeared! Catch ${this._capitalize(pokemon.name)}!`
               )
            );
            console.log(chalk.bgGreen("New todo added successfully"));
         }
      } else {
         console.log(chalk.bgMagenta(`Pokemon ID ${pokemonIDS[i]} does not exist`));
      }
   }

   async _chooseTaskToDelete() {
      const answer = await inquirer.prompt({
         name: "delete",
         type: "list",
         message: "Which task would you like to delete?",
         choices: this.getTasks(),
      });
      return this.getTasks().indexOf(answer.delete);
   }

   _capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
   }

   _printPokemonAscii(pokemon) {
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
}

export default new TaskManager();
