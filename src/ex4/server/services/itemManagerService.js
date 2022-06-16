const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const itemFile = "./server/data/itemsList.json";
const cacheDir = "./server/data/cache";
const cacheFilePath = "./server/data/cache/cache.json";
const { v4: ideKeyGen } = require("uuid");

fs.readdir(cacheDir, function (err, files) {
  files.forEach(function (file, index) {
    fs.stat(path.join(cacheDir, file), function (err, stat) {
      var endTime, now;
      if (err) {
        return console.error(err);
      }
      now = new Date().getTime();
      endTime = new Date(stat.ctime).getTime() + 6000;
      if (now > endTime) {
        return rimraf(path.join(cacheDir, file), function (err) {
          if (err) {
            return console.error(err);
          }
          console.log("cache file deleted");
        });
      }
    });
  });
});

async function checkIfPokemonIdInCache(pokemonId) {
  let cacheData = [];
  try {
    if (!fs.existsSync(cacheFilePath)) {
      createStorageFile(cacheFilePath);
    }
    cacheData = JSON.parse(fs.readFileSync(cacheFilePath));

    const pokemonExist = cacheData.find((item) => item === pokemonId);

    if (typeof pokemonExist === "undefined") {
      cacheData.push(pokemonId);

      writeToCacheItemFile(cacheData);
      return false;
    }

    return true;
  } catch (err) {
    console.error("cannot load", err);
  }
}

function createStorageFile(cacheFilePath) {
  try {
    fs.writeFileSync(cacheFilePath, JSON.stringify([]));
  } catch (e) {
    console.error(`cannot create file ${cacheFilePath}`, e);
  }
}

async function getAllItems() {
  return await readItemFile();
}

async function addItem(data) {
  return await writeToItemFile(data);
}

function addMultipleItems(items) {
  items.forEach((item) => {
    addItem(item);
  });
}

function isPokemonExist(data, pokemonName) {
  const pokemonExist = data.find((item) => item.name === pokemonName);
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
  addItem,
  getAllItems,
  getItemById,
  deleteItem,
  addMultipleItems,
  readItemFile,
  writeToItemFile,
  isPokemonExist,
  checkIfPokemonIdInCache,
};
