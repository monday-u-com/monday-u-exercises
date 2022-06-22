const CACHE_TIME_DELTA = 20000;
const fs = require("fs");
const path = require("path");
const itemFile = "./server/data/itemsList.json";
const cacheDir = "./server/data/cache";
const cacheFilePath = "./server/data/cache/cache.json";
const cacheFileName = "cache.json";

const { Item } = require("../db/models");

const { v4: ideKeyGen } = require("uuid");

function isPokemonExistInDb(data, pokemonId) {
  const pokemonIdExist = data.some(
    (item) => item.pokemonId === Number(pokemonId)
  );

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

module.exports = {
  getItemById,
  deleteItem,

  isPokemonExistInDb,

  getItems,
  createItemsBulk,
  updateStatusInDb,
};
