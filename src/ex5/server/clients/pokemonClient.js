const axios =  require("axios");

class PokemonClinet {
  constructor() {}
  async fetchPokemon(array) {
    try {
      const respones = array.map((id) =>
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then((response) => response.data)
      );

      return Promise.all(respones);
    } catch (err) {
      throw new Error("There is no Pokemon with this ID...");
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
      const arrayOfPokemons = respones.data;
      let res = null;
      for (const obj of arrayOfPokemons.results) {
        if (obj.name === name.toLowerCase()) {
          const response = await axios.get(obj.url);
          const pokemonObj = response.data;
          res = pokemonObj;
        }
      }
      return res;
    } catch (err) {
      throw new Error("There is no Pokemon with this Name...");
    }
  }
}
module.exports = new PokemonClinet();