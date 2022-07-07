const express = require('express');
const PokemonClient = require('../clients/pokemon-client.js');
const router = express.Router();

router.get('/:pokemon', async (req, res, next) => {
    const data = await pokemonClient.getPokemon(req.params.pokemon);
    res.status(200).json(data);
});

module.exports = router;
