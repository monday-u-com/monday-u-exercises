const fs = require("fs");
const pokemonClient = require("../clients/pokemon-client.js");
const POKEMON_FILE_NAME = "./server/pokemon-names.json";

class FileManager {
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

module.exports = new FileManager();
