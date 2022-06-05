export default class PokemonClient {
   constructor() {
      this.API_URL = "https://pokeapi.co/api/v2/pokemon/";
   }

   async getPokemon(pokemonID) {
      try {
         const response = await fetch(this.API_URL + pokemonID);
         const data = await response.json();
         return data;
      } catch (error) {
         return false;
      }
   }

   async getAllPokemonNames() {
      try {
         const response = await fetch(this.API_URL + "?limit=10000");
         const data = await response.json();
         const allPokemonNames = data.results.map((item) => item.name);

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
