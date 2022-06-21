const CACHE_TIME_DELTA = 20000;
const fs = require("fs");
const path = require("path");
const itemFile = "./server/data/itemsList.json";
const cacheDir = "./server/data/cache";
const cacheFilePath = "./server/data/cache/cache.json";
const cacheFileName = "cache.json";

const { Item } = require("../db/models");

const { v4: ideKeyGen } = require("uuid");

async function checkIfPokemonIdInCacheAndOverwriteToCache(currentPokemonId) {
  let cacheData = [];
  try {
    const itemForCache = { id: currentPokemonId, timestamp: new Date() };
    if (!fs.existsSync(cacheFilePath)) {
      createCacheFile(cacheFilePath);
      cacheData.push(itemForCache);
      writeToCacheItemFile(cacheData);

      return false;
    }

    cacheData = JSON.parse(fs.readFileSync(cacheFilePath).toString());

    const pokemonExistInCache = cacheData.some(
      (item) => item.id === currentPokemonId
    );

    if (!pokemonExistInCache) {
      cacheData.push(itemForCache);
      writeToCacheItemFile(cacheData);
      return false;
    } else {
      let pokemonIdInCache = cacheData.find(
        (item) => item.id === currentPokemonId
      );
      let pokemonIdInCacheIndex = cacheData.findIndex(
        (item) => item.id === currentPokemonId
      );

      let itemsTimeDelta =
        itemForCache.timestamp - Date.parse(pokemonIdInCache.timestamp);

      if (itemsTimeDelta > CACHE_TIME_DELTA) {
        cacheData[pokemonIdInCacheIndex].timestamp = new Date();
        writeToCacheItemFile(cacheData);
        return false;
      } else {
        return true;
      }
    }
  } catch (err) {
    console.error("cannot load", err);
  }
}

function createCacheFile(cacheFilePath) {
  try {
    fs.writeFileSync(cacheFilePath, JSON.stringify([]));
    fs.stat(path.join(cacheDir, cacheFileName), function (err, stat) {
      console.log("cache file created at: ", new Date(stat.ctime));
    });
  } catch (e) {
    console.error(`cannot create file ${cacheFilePath}`, e);
  }
}

function isPokemonExistInDb(data, pokemonName) {
  const pokemonExist = data.some((item) => item.name === pokemonName);

  return pokemonExist;
}

async function getItemById(itemId) {
  let itemFromDb = await Item.findOne({ where: { itemId: itemId } });

  return itemFromDb;
}

async function deleteItem(itemId) {
  const deletedItem = getItemById(itemId);

  await Item.destroy({ where: { itemId: itemId } });
}

async function deleteItemFromCache(pokemonId){
  let dataFromCache = await readCacheFile()
  
   let remainedDataInCache = dataFromCache.filter(
    item => Number(item.id) !== pokemonId
  ); 
 
 await writeToCacheItemFile(remainedDataInCache)

}

async function readCacheFile() {
  try {
    const data = await fs.readFileSync(cacheFilePath);

    return JSON.parse(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function writeToCacheItemFile(content) {
  try {
    fs.writeFileSync(cacheFilePath, JSON.stringify(content));
    return "file written";
  } catch (error) {
    console.error(`Failed to write to file ${error.message}`);
  }
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
  deleteItemFromCache,
  readCacheFile,

  isPokemonExistInDb,
  checkIfPokemonIdInCacheAndOverwriteToCache,

  getItems,
  createItemsBulk,
  updateStatusInDb,
};
