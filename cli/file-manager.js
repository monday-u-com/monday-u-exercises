import fs from "fs";
import PokemonClient from "./pokemon-client.js";
const POKEMON_FILE_NAME = "pokemon-names.json";
const TASKS_FILE_NAME = "tasks.json";

class File {
   getAllTasks() {
      if (fs.existsSync(TASKS_FILE_NAME)) {
         const fileData = fs.readFileSync(TASKS_FILE_NAME);
         const fileTasks = JSON.parse(fileData);

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

   async getPokemonNames() {
      if (fs.existsSync(POKEMON_FILE_NAME)) {
         const allPokemonNames = JSON.parse(fs.readFileSync(POKEMON_FILE_NAME));

         return allPokemonNames;
      } else {
         const pokemonClient = new PokemonClient();
         const data = await pokemonClient.getAllPokemonNames();
         const allPokemonNames = JSON.stringify(data);
         fs.writeFileSync(POKEMON_FILE_NAME, data);

         return allPokemonNames;
      }
   }

   _writeToFile(tasks) {
      fs.writeFileSync(TASKS_FILE_NAME, JSON.stringify(tasks), (error) => {
         if (error) {
            throw error;
         }
      });
   }
}

export default new File();
