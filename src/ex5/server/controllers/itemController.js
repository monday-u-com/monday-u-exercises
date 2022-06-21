const { v4: idKeyGen } = require("uuid");
const { validate: uuidValidate } = require("uuid");
const itemManagerService = require("../services/itemManagerService");
const parserService = require("../services/parserService");
const pokemonClientService = require("../clients/pokemonClientService");
const pokemonHandleService = require("../services/handlePokemonService");

async function createItem(req, res) {
  const dataToAddToDb = [];

  const currentDataFromDb = await itemManagerService.getItems();
  /*  let a = new Date()
  console.log("I am writing this new date",a )
  setTimeout(() => {
    let b = new Date()
    console.log("this is the second date", b) 
    console.log("this is the time passed", b-a);
  }, 200) */

  /// todo add validation function to check if there is body and data

  const pokemonOrTaskResults = await parserService.parseInputValue(
    req.body.data
  );

  pokemonOrTaskResults.tasks.forEach((result) => {
    result.itemId = idKeyGen();
    result.pokemonId = null;
    result.pokemonData = null;
    result.status = false;

    dataToAddToDb.push(result);
  });

  const pokemonsFetchErrors = [];
  for (let pokemon of pokemonOrTaskResults.pokemons) {
    try {
      let pokemonExistInCache = await itemManagerService.checkIfPokemonIdInCacheAndWriteToCache(pokemon.name)
    

if(!pokemonExistInCache){
      let pokemonDataFromClient = await pokemonClientService.fetchPokemon(
        pokemon.name
      );

      if (!pokemonDataFromClient.error) {
        const handledPokemon = pokemonHandleService.handlePokemon(
          pokemon,
          pokemonDataFromClient
        );

        const isPokemonExistInDb = itemManagerService.isPokemonExistInDb(
          currentDataFromDb,
          handledPokemon.name
        );

        if (!isPokemonExistInDb) {
          dataToAddToDb.push(handledPokemon);
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

module.exports = {
  createItem,
  getItems,
  getItemById,
  deleteItem,
};
