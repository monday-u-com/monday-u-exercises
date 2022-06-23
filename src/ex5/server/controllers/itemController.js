const { v4: idKeyGen } = require("uuid");
const { validate: uuidValidate } = require("uuid");
const itemManagerService = require("../services/itemManagerService");
const parserService = require("../services/parserService");
const pokemonClientService = require("../clients/pokemonClientService");
const pokemonHandleService = require("../services/handlePokemonService");

async function createItem(req, res) {
  const dataToAddToDb = [];

  const pokemonOrTaskResults = await parserService.parseInputValue(
    req.body.data
  );

  if (!req.body || !req.body.data) {
    let error = Error();
    error.statusCode = 404;
    error.message = "Not found";
    throw error;
  }

  for (let result of pokemonOrTaskResults.tasks) {
    result.itemId = idKeyGen();
    result.pokemonId = null;
    result.pokemonData = null;
    result.status = false;

    const isTaskExistInDataArray = itemManagerService.isTaskExistInDataArray(
      dataToAddToDb,
      result.itemName
    );

    const isTaskNameExistInDb = await itemManagerService.isTaskNameExistInDb(
      result.itemName
    );

    if (!isTaskNameExistInDb && !isTaskExistInDataArray) {
      dataToAddToDb.push(result);
    }
  }

  const pokemonsFetchErrors = [];

  for (let pokemon of pokemonOrTaskResults.pokemons) {
    try {
      const isPokemonExistInDb = await itemManagerService.isPokemonIdExistInDb(
        pokemon.itemName
      );

      const isPokemonExistInTransactionDataToDb =
        await itemManagerService.isPokemonExistInDataArray(
          dataToAddToDb,
          pokemon.itemName
        );

      if (!isPokemonExistInDb && !isPokemonExistInTransactionDataToDb) {
        let pokemonDataFromClient = await pokemonClientService.fetchPokemon(
          pokemon.itemName
        );

        if (!pokemonDataFromClient.error) {
          const handledPokemon = pokemonHandleService.handlePokemon(
            pokemon,
            pokemonDataFromClient
          );

          dataToAddToDb.push(handledPokemon);
        } else {
          pokemonsFetchErrors.push(pokemonDataFromClient.data);
        }
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

  await itemManagerService.createItemsBulk(dataToAddToDb);

  await res.status(200).json(dataToAddToDb);
}

async function getItems(req, res) {
  let data = await itemManagerService.getItems();

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

  let itemFromDB = await itemManagerService.getItemById(itemId);

  await itemManagerService.deleteItem(itemId);
  res.status(200).json(itemFromDB);
}
async function updateStatusInDb(req, res) {
  //add validations
  let itemId = req.body.itemId;
  let newStatus = req.body.newStatus;

  let validatedItemId = uuidValidate(itemId);
  if (!validatedItemId) {
    let error = Error();
    error.statusCode = 400;
    error.message = "Wrong parameters";
    throw error;
  }

  if (newStatus > 1 || newStatus < 0) {
    let error = Error();
    error.statusCode = 400;
    error.message = "Wrong parameters";
    throw error;
  }

  let updatedItem = await itemManagerService.updateStatusInDb(
    itemId,
    newStatus
  );

  await res.status(200).json(updatedItem);
}

async function updateDoneTimestamp(req, res) {
  let itemId = req.body.itemId;
  let timestamp = req.body.timestamp;

  let validatedItemId = uuidValidate(itemId);
  if (!validatedItemId) {
    let error = Error();
    error.statusCode = 400;
    error.message = "Wrong parameters";
    throw error;
  }

  let updatedItem = await itemManagerService.updateDoneTimestamp(
    itemId,
    timestamp
  );

  await res.status(200).json(updatedItem);
}

async function updateName(req, res) {
  let itemId = req.body.itemId;
  let newName = req.body.newName;

  let validatedItemId = uuidValidate(itemId);
  if (!validatedItemId) {
    let error = Error();
    error.statusCode = 400;
    error.message = "Wrong parameters";
    throw error;
  }

  let updatedItem = await itemManagerService.updateName(itemId, newName);
  await res.status(200).json(updatedItem);
}

module.exports = {
  createItem,
  getItems,
  getItemById,
  deleteItem,
  updateStatusInDb,
  updateDoneTimestamp,
  updateName,
};
