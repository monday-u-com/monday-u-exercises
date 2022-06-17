const { default: axios } = require("axios");

axios;
async function fetchPokemon(pokemonId) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
  const errorResponse = {
    error: true,
    data: pokemonId,
    description: `Pokemon with ID ${pokemonId} was not found`,
  };
  try {
    const response = await axios.get(url).then((response) => response);

    if (!response) {
      return errorResponse;
    }

    const data = response.data;

    if (data.name) {
      return {
        error: false,
        data: data,
        description: `Pokemon with ID ${pokemonId} data`,
      };
    }
    return errorResponse;
  } catch (error) {
    console.log("this is error fetching a pokemon");
    return errorResponse;
  }
}

async function fetchMultiplePokemons(pokemonsToFetch) {
  const promises = [];

  for (let pokemon of pokemonsToFetch) {
    let promise = await fetchPokemon(pokemon);

    promises.push(promise);
  }

  return promises;
}

module.exports = {
  fetchPokemon,
  fetchMultiplePokemons,
};
