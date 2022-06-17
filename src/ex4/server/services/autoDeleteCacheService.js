const CACHE_FILE_AUTO_DELETE_TIME = 15000;

const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const cacheFileName = "cache.json";
const itemFile = "./server/data/itemsList.json";
const cacheDir = "./server/data/cache";
const cacheFilePath = "./server/data/cache/cache.json";

function autoDeleteCache() {
  fs.readdir(cacheDir, function (err, files) {
    files.forEach(function (file, index) {
      fs.stat(path.join(cacheDir, cacheFileName), function (err, stat) {
        if (err) {
          return console.error(err);
        }

        setTimeout(() => {
          return rimraf(path.join(cacheDir, cacheFileName), function (err) {
            if (err) {
              return console.error(err);
            }
          });
        }, CACHE_FILE_AUTO_DELETE_TIME);
      });
    });
  });
}

module.exports = {
  autoDeleteCache,
};
