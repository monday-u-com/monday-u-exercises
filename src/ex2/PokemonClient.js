API_BASE = "https://pokeapi.co/api/v2/pokemon-form/";

class PokemonClient {
    async getPokemon(id) {
        try {
            const response = await fetch(`${API_BASE}${id}`, {
                method: "GET"
            })
            const result = await response.json()
            return result.name;
        } catch (e) {
            return false;
        }
    }

    async getPokemons(ids) {
        const promiseIDs = [];
        const IDs = ids.split(",");
        try {
            IDs.forEach(id => {
                promiseIDs.push(fetch(`${API_BASE}${id}`, { method: "GET" }))
            });
            const responses = await Promise.all(promiseIDs);
            const result = await Promise.all(responses.map(r => r.json()));
            return result.map(r => r.name)
        } catch (e) {
            return false;
        }
    }
}

