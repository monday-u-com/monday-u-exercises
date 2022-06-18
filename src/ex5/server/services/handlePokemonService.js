
const { v4: idKeyGen } = require("uuid");

function handlePokemon(pokemonObject, pokemonDataFromClient){


pokemonObject.pokemonId = pokemonDataFromClient.data.id;
pokemonObject.name = `Catch ${pokemonDataFromClient.data.name}`;
pokemonObject.itemId = idKeyGen();
pokemonObject.picture = pokemonDataFromClient.data.sprites.front_default;

return pokemonObject
}

module.exports = {
    handlePokemon
}