const { Item, sequelize } = require("../db/models");

const { v4: ideKeyGen } = require("uuid");

async function isPokemonIdExistInDb(pokemonId) {
  checkIfPokemonIdNumberOrName = /\d/.test(pokemonId);

  let pokemonIdExist = null;
  if (checkIfPokemonIdNumberOrName) {
    let pokemonIdCount = await Item.count({ where: { pokemonId: pokemonId } });
    return pokemonIdCount > 0;
  } else {
    let stringToCompare = `Catch ${pokemonId}`;
    let pokemonIdCount = await Item.count({ where: { name: stringToCompare } });
    return pokemonIdCount > 0;
  }
}

async function isTaskNameExistInDb(taskName) {
  let taskNameCount = await Item.count({ where: { itemName: taskName } });

  return taskNameCount > 0;
}
function isTaskExistInDataArray(dataToAddToDb, taskName) {
  let taskNameExist = dataToAddToDb.some((item) => item.itemName === taskName);

  return taskNameExist;
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
    pokemonIdExist = dataToAddToDb.some((item) => item.itemName === pokemonId);
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
  let items = await Item.findAll();

  return items;
}

async function createItemsBulk(itemsRow) {
  const t = await sequelize.transaction();

  try {
    await Item.bulkCreate(itemsRow, { t });
  } catch (error) {}
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

async function updateName(itemId, newName) {
  let itemName = newName;

  await Item.update({ itemName }, { where: { itemId: itemId } });
  let item = getItemById(itemId);
  return item;
}

module.exports = {
  getItemById,
  deleteItem,

  isPokemonIdExistInDb,
  isPokemonExistInDataArray,
  isTaskExistInDataArray,
  isTaskNameExistInDb,
  getItems,
  createItemsBulk,
  updateStatusInDb,
  updateDoneTimestamp,
  updateName,
};
