const { v4: idKeyGen } = require("uuid");
const { validate: uuidValidate } = require("uuid");
const itemManagerService = require("../services/itemManagerService");
const parserService = require("../services/parserService");
const pokemonClientService = require("../clients/pokemonClientService");
const pokemonHandleService = require("../services/handlePokemonService");

async function createItem(req, res) {
  const currentData = await itemManagerService.readItemFile();

  const pokemonOrTaskResults = parserService.parseInputValue(req.body.item);

  pokemonOrTaskResults.tasks.forEach((result) => {
    result.itemId = idKeyGen();
    result.picture = null;
    currentData.push(result);
  });

  const pokemonsFetchErrors = [];
  for (let pokemon of pokemonOrTaskResults.pokemons) {
    try {
      const isPokemonIdInCache =
        await itemManagerService.checkIfPokemonIdInCache(pokemon.name);

      if (!isPokemonIdInCache) {
        let pokemonDataFromClient = await pokemonClientService.fetchPokemon(
          pokemon.name
        );

        if (!pokemonDataFromClient.error) {
          const handledPokemon = pokemonHandleService.handlePokemon(
            pokemon,
            pokemonDataFromClient
          );

          const isPokemonExist = itemManagerService.isPokemonExist(
            currentData,
            handledPokemon.name
          );

          if (!isPokemonExist) {
            currentData.push(handledPokemon);
          }
        }

        if (pokemonDataFromClient.error) {
          
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
    
    errorsToData.forEach(error => currentData.push(error))
   
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
  console.log();
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
