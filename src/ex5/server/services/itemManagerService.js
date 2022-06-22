const CACHE_TIME_DELTA = 20000;

const { Item } = require("../db/models");

const { v4: ideKeyGen } = require("uuid");

function isPokemonExistInDb(data, pokemonId) {
  checkIfPokemonIdNumberOrName = /\d/.test(pokemonId);

  let pokemonIdExist = null;
  if (checkIfPokemonIdNumberOrName) {
    pokemonIdExist = data.some(
      (itemInData) => itemInData.pokemonId === Number(pokemonId)
    );

    return pokemonIdExist;
  } else {
    let stringToCompare = `Catch ${pokemonId}`;

    pokemonIdExist = data.map((item) => item.name).includes(stringToCompare);

    return pokemonIdExist;
  }
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

  isPokemonExistInDb,

  getItems,
  createItemsBulk,
  updateStatusInDb,
  updateDoneTimestamp,
};
