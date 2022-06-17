const { v4: idKeyGen } = require("uuid");
const { validate: uuidValidate } = require("uuid");
const itemManagerService = require("../services/itemManagerService");
const parserService = require("../services/parserService");
const pokemonService = require("../services/pokemonClientService");

async function createItem(req, res) {
  //validation

  const currentData = await itemManagerService.readItemFile();

  const pokemonOrTaskResults = parserService.parseInputValue(
    req.body.data.input
  );

  pokemonOrTaskResults.tasks.forEach((result) => {
    result.itemId = idKeyGen();
    result.picture = null;
    currentData.push(result);
  });

  const pokemonsErrors = [];
  for (let pokemon of pokemonOrTaskResults.pokemons) {
    try {
      const isPokemonIdInCache =
        await itemManagerService.checkIfPokemonIdInCache(pokemon.name);

      if (!isPokemonIdInCache) {
        let pokemonData = await pokemonService.fetchPokemon(pokemon.name);

        if (!pokemonData.error) {
          pokemon.pokemonId = pokemonData.data.id;

          pokemon.name = `Catch ${pokemonData.data.name}`;
          pokemon.itemId = idKeyGen();
          pokemon.picture = pokemonData.data.sprites.front_default;

          const isPokemonExist = itemManagerService.isPokemonExist(
            currentData,
            pokemon.name
          );

          if (!isPokemonExist) {
            currentData.push(pokemon);
          }
        }

        if (pokemonData.error) {
          pokemonsErrors.push(pokemonData.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  if (pokemonsErrors.length === 1) {
    const errorToString = `Pokemon with ID ${pokemonsErrors[0]} was not found`;
    const errorItem = {
      name: errorToString,
      itemId: idKeyGen(),
      isPokemon: false,
    };
    currentData.push(errorItem);
  }
  if (pokemonsErrors.length > 1) {
    const errorToString = `Failed to fetch pokemons with input :${pokemonsErrors.join(
      ","
    )}`;

    const errorItem = {
      name: errorToString,
      itemId: idKeyGen(),
      isPokemon: false,
    };

    currentData.push(errorItem);
  }

  //write all items once finished processing

  await itemManagerService.writeToItemFile(currentData);

  await res.status(200).json(currentData);
}

async function getAllItems(req, res) {
  let data = await itemManagerService.getAllItems();
  if (!data) data = [];
  res.status(200).json(data);
}

async function getItemById(req, res) {
  let itemId = req.params.id;

  let validatedItemId = uuidValidate(itemId);

  if (!validatedItemId) {
    let error = Error();
    error.statusCode = 400;
    error.message = "Wrong parameters";
    throw error;
  }
  let item = await itemManagerService.getItemById(itemId);

  if (!item) {
    let error = Error();
    error.statusCode = 404;
    error.message = "Not found";
    throw error;
  }
  res.status(200).json(item);
}

async function deleteItem(req, res) {
  let itemId = req.params.id;

  let validatedItemId = uuidValidate(itemId);
  if (!validatedItemId) {
    let error = Error();
    error.statusCode = 400;
    error.message = "Wrong parameters";
    throw error;
  }

  let item = await itemManagerService.getItemById(itemId);

  if (!item) {
    let error = Error();
    error.statusCode = 404;
    error.message = "Not found";
    throw error;
  }

  const data = await itemManagerService.deleteItem(itemId);
  res.status(200).json(data);
}

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  deleteItem,
};
