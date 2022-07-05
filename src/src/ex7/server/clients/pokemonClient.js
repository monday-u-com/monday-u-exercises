const axios =  require("axios");

class PokemonClinet {
  constructor() {}
  async fetchPokemon(arr) {
    try {
      const respones = arr.map((id) =>
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then((response) => response.data)
      );

      return Promise.all(respones);
    } catch (err) {
      throw new Error("failed to fetch pokemon by id");
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
      const pokemonsArrList = respones.data;

      let res = null;
      for (const obj of pokemonsArrList.results) {
        if (obj.name === name.toLowerCase()) {
          const response = await axios.get(obj.url);
          const pokemonObj = response.data;
          res = pokemonObj;
        }
      }
      return res;
    } catch (err) {
      throw new Error("failed to fetch pokemon by his name");
    }
  }
}

module.exports = new PokemonClinet();