const fs = require("fs");
const path = require("path");
const itemFile = "./server/data/itemsList.json";
const cacheDir = "./server/data/cache";
const cacheFilePath = "./server/data/cache/cache.json";
const cacheFileName = "cache.json";
const autoDeleteCacheService = require("./autoDeleteCacheService");

const { v4: ideKeyGen } = require("uuid");

async function checkIfPokemonIdInCache(pokemonId) {
  let cacheData = [];
  try {
    if (!fs.existsSync(cacheFilePath)) {
      createCacheFile(cacheFilePath);

      cacheWriteAutoDelete(pokemonId, cacheData);

      return false;
    }

    cacheData = JSON.parse(fs.readFileSync(cacheFilePath));

    const pokemonExist = cacheData.some((item) => item === pokemonId);

    if (!pokemonExist) {
      cacheWriteAutoDelete(pokemonId, cacheData);

      return false;
    }

    return true;
  } catch (err) {
    console.error("cannot load", err);
  }
}

function cacheWriteAutoDelete(pokemonId, cacheData) {
  cacheData.push(pokemonId);
  writeToCacheItemFile(cacheData);
  autoDeleteCacheService.autoDeleteCache();
 
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

async function getAllItems() {
  return await readItemFile();
}

function isPokemonExist(data, pokemonName) {
  const pokemonExist = data.some((item) => item.name === pokemonName);
  return pokemonExist;
}

async function getItemById(itemId) {
  const data = await readItemFile();
  return data.find((item) => item.itemId === itemId);
}

async function deleteItem(itemId) {
  const data = await getAllItems();
  const index = data.findIndex((item) => item.itemId === itemId);

  const deletedItem = data[index];
  data.splice(index, 1);

  await writeToItemFile(data);
  return deletedItem;
}

async function readItemFile() {
  try {
    const data = await fs.readFileSync(itemFile);
    return JSON.parse(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function writeToItemFile(content) {
  try {
    fs.writeFileSync(itemFile, JSON.stringify(content));
    return "file written";
  } catch (error) {
    console.error(`Failed to write to file ${error.message}`);
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

module.exports = {
  getAllItems,
  getItemById,
  deleteItem,

  readItemFile,
  writeToItemFile,
  isPokemonExist,
  checkIfPokemonIdInCache,
};
