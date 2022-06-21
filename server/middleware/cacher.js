// This middleware checks for Pokemon Id's and if they are stored in "cache", removes them from the request.
let cachedIDs = [];
setInterval(() => {
   cachedIDs = [];
}, 6000);

module.exports = function cacher(req, res, next) {
   const potentialPokemonIDS = req.body.task.replace(/\s/g, "").split(","); // "1, 2, 3" => [1,2,3]

   if (potentialPokemonIDS.every((elem) => !isNaN(elem))) {
      const pokemonIDS = potentialPokemonIDS;
      let idsToPass = [];
      pokemonIDS.forEach((id) => {
         if (!cachedIDs.includes(id)) {
            cachedIDs.push(id);
            idsToPass.push(id);
         }
      });
      if (idsToPass.length === 0) {
         res.status(200).json({ success: false }).send();
      } else {
         req.body.task = idsToPass.toString();

         next();
      }
   } else {
      next();
   }
};
