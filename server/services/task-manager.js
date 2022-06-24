const pokemonClient = require("../clients/pokemon-client.js");
const db = require("./db-manager.js");

class TaskManager {
   getTasks = async () => await db.getAllTasks();

   async add(task) {
      const allPokemonNames = await db.getFilePokemonNames();
      let pokemonIDS = task.replace(/\s/g, "").split(","); // "1, 2, 3" => [1,2,3]

      if (pokemonIDS.every((elem) => !isNaN(elem) || allPokemonNames.includes(elem))) {
         const pokemonData = await Promise.all(
            pokemonIDS.map((id) => pokemonClient.getPokemon(id))
         );

         let tasks = [];
         pokemonData.forEach((pokemon) => {
            tasks.push(this._pokemonTasksHandle(pokemon));
         });

         await db.addTask(tasks);
      } else {
         await db.addTask([new Task(task)]);
      }
   }

   remove = (id) => db.deleteTask(id);

   clear = () => db.clearTasks();

   sort = async (direction) => await db.sortTasks(direction);

   async checkMarkTask(checkMarkReq) {
      await db.checkMarkTask(checkMarkReq.isChecked, checkMarkReq.taskID);
   }

   _pokemonTasksHandle(pokemon) {
      let task;
      if (pokemon) {
         let pokemonName = this._capitalize(pokemon.name);
         const pokemonTypes = this._capitalize(pokemonClient.getPokemonTypes(pokemon));
         const taskToAdd = `Catch ${pokemonName} of type ${pokemonTypes}`;
         const imageURL = pokemon.sprites.front_default;

         task = new Task(taskToAdd, pokemon.id, pokemonName, pokemonTypes, imageURL);
      } else {
         task = new Task(`Pokemon ID ${pokemon.id} does not exist`);
      }

      return task;
   }

   _capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
   }
}

class Task {
   constructor(text, pokemonID, pokemonName, pokemonType, imageURL, status = 0) {
      this.text = text;
      this.pokemonID = pokemonID;
      this.pokemonName = pokemonName;
      this.pokemonType = pokemonType;
      this.imageURL = imageURL;
      this.status = status;
   }
}

module.exports = new TaskManager();
