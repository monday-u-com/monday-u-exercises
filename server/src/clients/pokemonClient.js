const axios = require("axios");
const pokemonApi = "https://pokeapi.co/api/v2/pokemon/";

async function fetchPokemon(id) {
  const api = pokemonApi + id;

  try {
    const response = await axios.get(api);
    const result = {
      getRequestResult: "success",
      data: response.data,
    };
    return result;
  } catch (e) {
    if (e.response.status == 404) {
      const response = {
        getRequestResult: "failed",
        id,
      };
      return response;
    } else {
      throw new Error("No intenet connection");
    }
  }
}

async function fetchePokemonsIdHandler(pokemonsIdArr) {
  let allRequestsResults;
  const allFetchRequests = pokemonsIdArr.map((pokemonId) => {
    return fetchPokemon(pokemonId);
  });

  allRequestsResults = await Promise.all(allFetchRequests);

  return allRequestsResults;
}

module.exports = {
  fetchePokemonsIdHandler,
};
