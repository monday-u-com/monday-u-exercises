const   fs = require( "fs");
const  path  = require("path");
const rimraf  =  require( "rimraf");

 function autoDeleteCache() {

  const cacheDir = "./server/db";
  const cacheFileName = "cache.json";
  fs.readdir(cacheDir, function (err, files) {
    files.forEach(function (file, index) {
      fs.stat(path.join(cacheDir, cacheFileName), function (err, stat) {
        
        if (err) {
          return console.error(err);
        }
        setTimeout(()=>{
            return rimraf(path.join(cacheDir, cacheFileName), function (err) {
                if (err) {
                  return console.error(err);
                }
                console.log("cache file deleted");
              });

        },60000)
     
      });
    });
  });
}
module.exports = {
  autoDeleteCache

}