import axios from "axios";

class PokemonClinet {
  constructor() {}
  async  fetchPokemon(array){

    try{
      const respones = array.map((id) => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response)=>response.data))
      return Promise.all(respones)
      }
      catch(err)
      {
        throw new Error('failed to fetch pokemon by id')
      }
    }
  async checkByPokemonName(name) {
    let respones = [];
    try {
      respones = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
        
      );
    } catch (err) {
      throw new Error("failed to fetch pokemon list");
    }
    try {
      const pokemonsarrayList =  respones.data;

      let res = null;
      for (const pokemon of pokemonsarrayList.results) {
        if (pokemon.name === name.toLowerCase()) {
          const response = await axios.get(pokemon.url);
          const pokemonpokemon =  response.data;
          res = pokemonpokemon;
        }
      }
      return res;
    } catch (err) {
      throw new Error("failed to fetch pokemon by his name");
    }
  }
}



export default new PokemonClinet();
