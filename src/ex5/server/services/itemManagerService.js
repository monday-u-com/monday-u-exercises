const CACHE_TIME_DELTA = 20000;

const { Item } = require("../db/models");

const { v4: ideKeyGen } = require("uuid");

async function isPokemonIdExistInDb(pokemonId) {
  checkIfPokemonIdNumberOrName = /\d/.test(pokemonId);

  let pokemonIdExist = null;
  if (checkIfPokemonIdNumberOrName) {
    let pokemonIdCount = await Item.count({ where: { pokemonId: pokemonId } });

    if (pokemonIdCount > 0) {
      pokemonIdExist = true;
    } else {
      pokemonIdExist = false;
    }

    return pokemonIdExist;
  } else {
    let stringToCompare = `Catch ${pokemonId}`;
    let pokemonIdCount = await Item.count({ where: { name: stringToCompare } });

    if (pokemonIdCount > 0) {
      pokemonIdExist = true;
    } else {
      pokemonIdExist = false;
    }
    return pokemonIdExist;
  }
}

async function isPokemonExistInDataArray(dataToAddToDb, pokemonId) {
  checkIfPokemonIdNumberOrName = /\d/.test(pokemonId);
  let pokemonIdExist;
  if (checkIfPokemonIdNumberOrName) {
    pokemonIdExist = dataToAddToDb.some(
      (item) => Number(item.pokemonId) === Number(pokemonId)
    );
  } else {
    let stringToCompare = `Catch ${pokemonId}`;
    pokemonIdExist = dataToAddToDb.some((item) => item.name === pokemonId);
  }
  return pokemonIdExist;
}

async function getItemById(itemId) {
  let itemFromDb = await Item.findOne({ where: { itemId: itemId } });

  return itemFromDb;
}

async function deleteItem(itemId) {
  const deletedItem = getItemById(itemId);

  await Item.destroy({ where: { itemId: itemId } });
}

async function getItems() {
  return await Item.findAll();
}

async function createItemsBulk(itemsRow) {
  await Item.bulkCreate(itemsRow);
}

async function updateStatusInDb(itemId, newStatus) {
  let status = newStatus;
  Item.update({ status }, { where: { itemId: itemId } });
  let item = getItemById(itemId);
  return item;
}

async function updateDoneTimestamp(itemId, timestamp) {
  let doneAt = timestamp;

  Item.update({ doneAt }, { where: { itemId: itemId } });
  let item = getItemById(itemId);
  return item;
}

module.exports = {
  getItemById,
  deleteItem,

  isPokemonIdExistInDb,
  isPokemonExistInDataArray,
  getItems,
  createItemsBulk,
  updateStatusInDb,
  updateDoneTimestamp,
};
