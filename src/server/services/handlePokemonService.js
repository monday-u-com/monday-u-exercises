const { v4: idKeyGen } = require("uuid");

function handlePokemon(pokemonObject, pokemonDataFromClient) {
  pokemonObject.pokemonId = pokemonDataFromClient.data.id;
  pokemonObject.itemName = `Catch ${pokemonDataFromClient.data.name}`;
  pokemonObject.itemId = idKeyGen();
  pokemonObject.pokemonData = `${pokemonDataFromClient.data.sprites.front_default}`;
  pokemonObject.status = false;

  return pokemonObject;
}

function handlePokemonErrors(pokemonsFetchErrors) {
  const errorItems = [];
  if (pokemonsFetchErrors.length === 1) {
    const errorToString = `Pokemon with ID ${pokemonsFetchErrors[0]} was not found`;
    const errorItem = {
      itemName: errorToString,
      itemId: idKeyGen(),
      isPokemon: false,
    };
    errorItems.push(errorItem);
  }
  if (pokemonsFetchErrors.length > 1) {
    const errorToString = `Failed to fetch pokemons with input :${pokemonsFetchErrors.join(
      ","
    )}`;

    const errorItem = {
      itemName: errorToString,
      itemId: idKeyGen(),
      isPokemon: false,
    };

    errorItems.push(errorItem);
  }
  return errorItems;
}

module.exports = {
  handlePokemon,
  handlePokemonErrors,
};
