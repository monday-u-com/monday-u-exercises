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
         let pokemonImagesURLs = [];
         let pokemonIDS = task.replace(/\s/g, "").split(","); // "1, 2, 3" => [1,2,3]
         const pokemonData = await Promise.all(
            pokemonIDS.map((id) => pokemonClient.getPokemon(id))
         );
         pokemonData.forEach((pokemon, i) => {
            pokemonImagesURLs = pokemonImagesURLs.concat(
               this._pokemonTasksHandle(pokemon, pokemonIDS, i)
            );
         });

         return pokemonImagesURLs;
      } else {
         file.addTask(task);

         return [];
      }
   }

   remove = (i) => file.deleteTask(i);

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
            file.addTask(
               `${pokemonName} already exists in your tasks. Please try another Pokemon.`
            );

            return [];
         } else {
            file.addTask(taskToAdd);

            return pokemon.sprites.front_default;
         }
      } else {
         file.addTask(`Pokemon ID ${pokemonIDS[i]} does not exist`);

         return [];
      }
   }

   _capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
   }
}

module.exports = new TaskManager();
