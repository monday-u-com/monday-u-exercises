// The Pokemon Client (using axios) goes here
import axios from "axios";

class PokemonClinet {
  constructor() {}

  async fetchPokemon(pokeArray) {
    try {
      const respones = pokeArray.map((id) =>
        axios.get(`https:pokeapi.co/api/v2/pokemon/${id}`)
      );
      return Promise.all(respones).then((response) =>
        Promise.all(response.map((res) => res.json()))
      );
    } catch (err) {
      console.log(`failed to fetch pokemon with the ${id}`);
    }
  }

  async checkByPokemonName(name) {
    console.log('checkbyname')
    let respones = [];
    try {
      respones = await axios.get(
        `https:pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
      );
    } catch (err) {
      console.log("failed to fetch pokemon list");
    }
    try {
      const pokemonspokeArrayList = await respones.json();

      let res = null;
      for (const obj of pokemonspokeArrayList.results) {
        if (obj.name === name.toLowerCase()) {
          const response = await fetch(obj.url);
          const pokemonObj = await response.json();
          res = pokemonObj;
        }
      }
      return res;
    } catch (err) {
      console.log("failed to fetch pokemon by his name");
    }
  }
}



export default new PokemonClinet();

