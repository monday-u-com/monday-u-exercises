const fs = require("fs");
const path = require("path");
const { FIVE_MIN } = require("./globalConsts/GlobalConstants.js");

//if element in cache is older than 5 minutes, remove it
function clearCache() {
  const cacheFile = "../db/pokemonsCache.json";
  const cache = fs.readFileSync(path.join(__dirname, cacheFile));
  const cacheArray = JSON.parse(cache);
  const time = new Date().getTime();
  cacheArray.forEach((element) => {
    if (time - element.time > FIVE_MIN) {
      cacheArray.splice(cacheArray.indexOf(element), 1);
    }
  });
  fs.writeFileSync(path.join(__dirname, cacheFile), JSON.stringify(cacheArray));
}

module.exports = clearCache;
