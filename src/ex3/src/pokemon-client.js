import fetch from 'node-fetch';
// const fetch = require("./fileSystemManager");

class PokemonClient {
    constructor() {
        this.API_BASE = 'https://pokeapi.co/api/v2/pokemon';
    }

    async getPokemon(pokemon) {
        try {
            const response = await fetch(`${this.API_BASE}/${pokemon}`);
            return this.handleResponse(response, pokemon);
        } catch (error) {
            return this.handleResponse(response, pokemon, error);
        }
    }

    async handleResponse(pokemonResponse, pokemon, error) {
        const response = { success: true };
        const status = pokemonResponse.status;
        if (error) {
            response.error = error.toString();
            response.success = false;
        }
        else if (status == 404) {
            response.error = `Pokemon with ID ${pokemon} was not found`;
            response.success = false;
        } else if (status == 200) {
            response.body = await pokemonResponse.json();
        }
        return response;
    }
}

export default PokemonClient
