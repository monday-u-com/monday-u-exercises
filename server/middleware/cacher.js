// This middleware checks for Pokemon Id's and if they are stored in "cache", removes them from the request.
let cachedIDs = [];
setInterval(() => {
   cachedIDs = [];
}, 60000);

module.exports = function cacher(req, res, next) {
   if (
      req.body.task
         .replace(/\s/g, "")
         .split(",")
         .every((elem) => !isNaN(elem))
   ) {
      let idsToPass = [];
      const pokemonIDS = req.body.task.replace(/\s/g, "").split(","); // "1, 2, 3" => [1,2,3]
      pokemonIDS.forEach((id) => {
         if (!cachedIDs.includes(id)) {
            cachedIDs.push(id);
            idsToPass.push(id);
         }
      });
      if (idsToPass.toString() === "") {
         res.status(200).json("Not render").send();
      } else {
         req.body.task = idsToPass.toString();

         next();
      }
   } else {
      next();
   }
};
