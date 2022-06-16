import { GetPokemonsNames } from '../services/PokemonService.mjs';

/**
* get list of all pokemon
*/
export async function GetPokemons(request, response, next) {
    try {
        const pokemons = await GetPokemonsNames();
        return response.status(200).json({
            status: 200,
            pokemons: pokemons
        });
    } catch (error) {
        next(error);
    }
}

