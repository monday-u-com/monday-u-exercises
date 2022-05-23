class PokemonClient {
   constructor() {
      this.API_URL = "https://pokeapi.co/api/v2/pokemon/";
   }

   async getPokemon(pokemonID) {
      const response = await fetch(this.API_URL + pokemonID);
      const data = await response.json();
      return data;
   }
}
