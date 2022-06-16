const { v4: ideKeyGen } = require("uuid");
const { validate: uuidValidate } = require("uuid");
const itemManagerService = require("../services/itemManagerService");
const parserService = require("../services/parserService");

async function getPokemonId(req, res) {
  await res.status(200).json(req.body);
}

async function createItem(req, res) {
  //validation

  const pokemonOrTaskResults = parserService.parseInputValue(req.body.input);

  //itemManagerService.addMultipleItems(result);

  pokemonOrTaskResults.forEach((result) => {
    console.log(result)
    if (!result.isPokemon){
        itemManagerService.addItem(result)
    }
  });



  await res.status(200).json(req.body);
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
