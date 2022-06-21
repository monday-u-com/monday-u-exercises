const fs = require("fs");
const pokemonClient = require("../clients/pokemon-client.js");
const { Task } = require("../db/models");
const POKEMON_FILE_NAME = "./server/pokemon-names.json";

class DBManager {
   getAllTasks = async () => {
      await Task.sync();
      return await Task.findAll();
   };

   async addTask(task) {
      await Task.create({
         text: task.text,
         pokemonID: task.pokemonID,
         pokemonName: task.pokemonName,
         pokemonType: task.pokemonType,
         imageURL: task.imageURL,
      });
   }

   async deleteTask(index) {
      await Task.destroy({
         where: { id: index },
      });
   }

   clearTasks = async () =>
      await Task.destroy({
         where: {},
         truncate: true,
      });

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

module.exports = new DBManager();
