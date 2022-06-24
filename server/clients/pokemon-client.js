const axios = require("axios").default;

class PokemonClient {
   constructor() {
      this.API_URL = "https://pokeapi.co/api/v2/pokemon/";
      this.cache = [];
   }

   async getPokemon(pokemonID) {
      try {
         // Cache holds previous fetched pokemons data. If id does not exist in cache then fetch from api
         if (this.cache.some((e) => e.id === pokemonID)) {
            return this.cache.filter((e) => e.id === pokemonID)[0].data;
         }

         const response = await axios.get(this.API_URL + pokemonID);
         this.cache.push({ id: pokemonID, data: response.data });

         return response.data;
      } catch (error) {
         return false;
      }
   }

   async getAllPokemonNames() {
      try {
         const response = await axios.get(this.API_URL + "?limit=10000");
         const allPokemonNames = response.data.results.map((item) => item.name);

         return allPokemonNames;
      } catch (error) {
         console.error(error);
      }
   }

   getPokemonTypes(pokemon) {
      const pokemonTypes = pokemon.types.map((item) => item.type.name);
      return pokemonTypes.join();
   }
}

module.exports = new PokemonClient();
