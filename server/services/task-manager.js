const pokemonClient = require("../clients/pokemon-client.js");
const db = require("./db-manager.js");

class TaskManager {
   getTasks = async () => await db.getAllTasks();

   async add(task) {
      const allPokemonNames = await db.getFilePokemonNames();
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
         pokemonData.forEach(async (pokemon, index) => {
            await this._pokemonTasksHandle(pokemon, pokemonIDS[index]);
         });
      } else {
         await db.addTask(new Task(task));
      }
   }

   remove = (taskText) => db.deleteTask(taskText);

   clear = () => db.clearTasks();

   sort(direction) {
      let sortedTasks;
      sortedTasks = this.getTasks().sort((a, b) => {
         if (a.taskText < b.taskText) return 1;
         return -1;
      });
      if (direction === "down") {
         sortedTasks = sortedTasks.reverse();
      }
      db.clearTasks();
      sortedTasks.forEach((task) => db.addTask(task));
   }

   async _pokemonTasksHandle(pokemon, pokemonID) {
      let task;
      if (pokemon) {
         let pokemonName = this._capitalize(pokemon.name);
         const pokemonTypes = this._capitalize(pokemonClient.getPokemonTypes(pokemon));
         const taskToAdd = `Catch ${pokemonName} of type ${pokemonTypes}`;
         const imageURL = pokemon.sprites.front_default;
         task = new Task(taskToAdd, pokemonID, pokemonName, pokemonTypes, imageURL);

         // if (file.getAllTasks().includes(taskToAdd)) {
         //    task.taskText(
         //       `${pokemonName} already exists in your tasks. Please try another Pokemon.`
         //    );
         //    task.imageURL = [];
         // }
      } else {
         task = new Task(`Pokemon ID ${pokemonID} does not exist`);
      }
      await db.addTask(task);
   }

   _capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
   }
}

class Task {
   constructor(text, pokemonID, pokemonName, pokemonType, imageURL) {
      this.text = text;
      this.pokemonID = pokemonID;
      this.pokemonName = pokemonName;
      this.pokemonType = pokemonType;
      this.imageURL = imageURL;
   }
}

module.exports = new TaskManager();
