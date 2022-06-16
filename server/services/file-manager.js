const fs = require("fs");
const pokemonClient = require("../clients/pokemon-client.js");
const POKEMON_FILE_NAME = "./server/pokemon-names.json";
const TASKS_FILE_NAME = "./server/tasks.json";

class File {
   getAllTasks() {
      if (fs.existsSync(TASKS_FILE_NAME)) {
         const data = fs.readFileSync(TASKS_FILE_NAME);
         const fileTasks = JSON.parse(data);

         return fileTasks;
      } else {
         fs.writeFileSync(TASKS_FILE_NAME, JSON.stringify([]));

         return [];
      }
   }

   addTask(task) {
      let allTasks = this.getAllTasks();
      allTasks = [...allTasks, task];
      try {
         this._writeToFile(allTasks);
      } catch (error) {
         console.error("Fail to add task");
         throw error;
      }
   }

   deleteTask(index) {
      const allTasks = this.getAllTasks();
      allTasks.splice(index, 1);
      try {
         this._writeToFile(allTasks);
      } catch (error) {
         console.error("Failed to delete todo");
         throw error;
      }
   }

   clearTasks() {
      try {
         this._writeToFile([]);
      } catch (error) {
         console.error("Failed to clear all todos");
         throw error;
      }
   }

   async getFilePokemonNames() {
      if (fs.existsSync(POKEMON_FILE_NAME)) {
         const allPokemonNames = JSON.parse(fs.readFile(POKEMON_FILE_NAME));

         return allPokemonNames;
      } else {
         const data = await pokemonClient.getAllPokemonNames();
         const allPokemonNames = JSON.stringify(data);
         fs.writeFileSync(POKEMON_FILE_NAME, allPokemonNames);

         return allPokemonNames;
      }
   }

   _writeToFile(tasks) {
      console.log(tasks);
      fs.writeFileSync(TASKS_FILE_NAME, JSON.stringify(tasks), (error) => {
         if (error) {
            throw error;
         }
      });
   }
}

module.exports = new File();
