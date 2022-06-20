const { v4: idKeyGen } = require("uuid");
const { validate: uuidValidate } = require("uuid");
const itemManagerService = require("../services/itemManagerService");
const parserService = require("../services/parserService");
const pokemonClientService = require("../clients/pokemonClientService");
const pokemonHandleService = require("../services/handlePokemonService");
const storage = require("../services/storageService");

async function createItem(req, res) {
  const dataToAddToDb = [];
  const currentDataFromDb = await storage.getItems();

  const pokemonOrTaskResults = await parserService.parseInputValue(
    req.body.data
  );

  pokemonOrTaskResults.tasks.forEach((result) => {
    result.itemId = idKeyGen();
    result.pokemonId = null;
    result.pokemonData = null;

    dataToAddToDb.push(result);
  });

  const pokemonsFetchErrors = [];
  for (let pokemon of pokemonOrTaskResults.pokemons) {
    try {
      let pokemonDataFromClient = await pokemonClientService.fetchPokemon(
        pokemon.name
      );

      if (!pokemonDataFromClient.error) {
        const handledPokemon = pokemonHandleService.handlePokemon(
          pokemon,
          pokemonDataFromClient
        );

        const isPokemonExist = itemManagerService.isPokemonExist(
          currentDataFromDb,
          handledPokemon.name
        );

        if (!isPokemonExist) {
          dataToAddToDb.push(handledPokemon);
        }
      }

      if (pokemonDataFromClient.error) {
        pokemonsFetchErrors.push(pokemonDataFromClient.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const errorsToData =
    pokemonHandleService.handlePokemonErrors(pokemonsFetchErrors);

  if (errorsToData.length > 0) {
    errorsToData.forEach((error) => dataToAddToDb.push(error));
  }

  await storage.createItemsBulk(dataToAddToDb);

  await res.status(200).json(dataToAddToDb);
}

async function getAllItems(req, res) {
  let data = await storage.getItems();

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
  let itemId = await req.params.id;

  let validatedItemId = uuidValidate(itemId);
  if (!validatedItemId) {
    let error = Error();
    error.statusCode = 400;
    error.message = "Wrong parameters";
    throw error;
  }

  let itemFromDB = await storage.getItem(itemId);

  await storage.deleteItem(itemId);

  res.status(200).json(itemFromDB);
}

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  deleteItem,
};
