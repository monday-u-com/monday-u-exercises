const pokemonClient = require("../clients/pokemon-client.js");
const file = require("./file-manager.js");

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
         pokemonData.forEach((pokemon, index) => {
            this._pokemonTasksHandle(pokemon, pokemonIDS[index]);
         });
      } else {
         file.addTask(new Task(task));
      }
   }

   remove = (i) => file.deleteTask(i);

   clear = () => file.clearTasks();

   sort(direction) {
      let sortedTasks;
      sortedTasks = this.getTasks().sort((a, b) => {
         if (a.taskText < b.taskText) return 1;
         return -1;
      });
      if (direction === "down") {
         sortedTasks = sortedTasks.reverse();
      }
      file.clearTasks();
      sortedTasks.forEach((task) => file.addTask(task));
   }

   _pokemonTasksHandle(pokemon, pokemonID) {
      let task;
      if (pokemon) {
         let pokemonName = this._capitalize(pokemon.name);
         const pokemonTypes = this._capitalize(pokemonClient.getPokemonTypes(pokemon));
         const taskToAdd = `Catch ${pokemonName} of type ${pokemonTypes}`;
         const imageURL = pokemon.sprites.front_default;
         task = new Task(taskToAdd, pokemonID, pokemonName, pokemonTypes, imageURL);

         if (file.getAllTasks().includes(taskToAdd)) {
            task.taskText(
               `${pokemonName} already exists in your tasks. Please try another Pokemon.`
            );
         }
      } else {
         task = new Task(`Pokemon ID ${pokemonID} does not exist`);
      }
      file.addTask(task);
   }

   _capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
   }
}

class Task {
   constructor(taskText, pokemonID, pokemonName, pokemonType, imageURL) {
      this.taskText = taskText;
      this.pokemonID = pokemonID;
      this.pokemonName = pokemonName;
      this.pokemonType = pokemonType;
      this.imageURL = imageURL;
   }
}

module.exports = new TaskManager();
