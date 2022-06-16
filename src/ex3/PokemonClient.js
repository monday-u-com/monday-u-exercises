import fetch from "node-fetch";

class PokemonClient {
    constructor() {
        this.API_BASE = "https://pokeapi.co/api/v2/pokemon-form/";
    }

    async getPokemons(ids) {
        const promiseIDs = [];
        const IDs = ids.split(",");
        try {
            IDs.forEach(id => {
                promiseIDs.push(fetch(`${this.API_BASE}${id}`))
            });
            const responses = await Promise.all(promiseIDs);
            const result = await Promise.all(responses.map(r => r.json()));
            return result
        } catch (e) {
            return false;
        }
    }
}

export default PokemonClient;