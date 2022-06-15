import express from 'express'
import PokemonClient from "../clients/pokemon-client.js";

const router = express.Router();
const pokemonClient = new PokemonClient;

router.get('/:pokemon', async (req, res, next) => {
    const data = await pokemonClient.getPokemon(req.params.pokemon);
    res.status(200).json(data);
});

export default router;
