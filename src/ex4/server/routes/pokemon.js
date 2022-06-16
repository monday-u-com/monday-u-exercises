import express from 'express';

import {
    GetPokemons,
} from '../controllers/PokemonController.js';

const pokemon_router = express.Router();

pokemon_router.get('/', GetPokemons);

export default pokemon_router;