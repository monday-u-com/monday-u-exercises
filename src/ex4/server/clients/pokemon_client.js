// The Pokemon Client (using axios) goes here
const axios = require('axios').default;
const API_BASE = "https://pokeapi.co/api/v2/pokemon-form/";

async function getPokemon(id) {
    try {
        const { data } = await axios.get(`${API_BASE}${id}`);
        return data;

    } catch (error) {
        throw new Error("Failed to fetch pokemon");
    }
}

async function getManyPokemon(ids) {
    try {
        const promises = ids.map((id) => axios.get(`${API_BASE}${id}`));
        const responses = await Promise.all(promises);
        const pokemons = responses.map((r) => r.data);

        return pokemons;
    } catch (error) {
        throw new Error("Failed to fetch pokemon");
    }
}

module.exports = {
    getPokemon,
    getManyPokemon
}