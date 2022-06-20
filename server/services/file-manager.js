const fs = require("fs");
const pokemonClient = require("../clients/pokemon-client.js");
const { Task } = require("../db/models");
const POKEMON_FILE_NAME = "./server/pokemon-names.json";
const TASKS_FILE_NAME = "./server/tasks.json";

class File {
   getAllTasks = async () => await Task.findAll();

   async addTask(task) {
      let allTasks = this.getAllTasks();
      allTasks = [...allTasks, task];
      this._writeToFile(TASKS_FILE_NAME, allTasks);
      // await Task.create(task);
   }

   deleteTask(index) {
      const allTasks = this.getAllTasks();
      allTasks.splice(index, 1);
      this._writeToFile(TASKS_FILE_NAME, allTasks);
   }

   clearTasks = () => this._writeToFile(TASKS_FILE_NAME, []);

   async getFilePokemonNames() {
      if (fs.existsSync(POKEMON_FILE_NAME)) {
         const allPokemonNames = JSON.parse(fs.readFileSync(POKEMON_FILE_NAME));

         if (!allPokemonNames) {
            let error = Error();
            error.statusCode = 500;
            error.message = "Failed to write to file";

            throw error;
         }

         return allPokemonNames;
      } else {
         const allPokemonNames = await pokemonClient.getAllPokemonNames();
         this._writeToFile(POKEMON_FILE_NAME, allPokemonNames);

         return allPokemonNames;
      }
   }

   _writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data), (error) => {
         if (error) {
            error.statusCode = 500;
            error.message = "Failed to write to file";

            throw error;
         }
      });
   }
}

module.exports = new File();
