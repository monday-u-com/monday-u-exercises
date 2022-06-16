const fs = require("fs");
const path = require("path");

//if element in cache is older than 5 minutes, remove it
function clearCache() {
  const cacheFile = "../DB/pokemonsCache.json";
  const cache = fs.readFileSync(path.join(__dirname, cacheFile));
  const cacheArray = JSON.parse(cache);
  const time = new Date().getTime();
  cacheArray.forEach((element) => {
    if (time - element.time > 300000) {
      cacheArray.splice(cacheArray.indexOf(element), 1);
    }
  });
  fs.writeFileSync(path.join(__dirname, cacheFile), JSON.stringify(cacheArray));
}

module.exports = clearCache;
