class PokemonClient {
    constructor() {
        this.API_BASE = "https://pokeapi.co/api/v2/pokemon-form/";
    }
    async getPokemon(id) {
        try {
            const response = await fetch(`${this.API_BASE}${id}`, {
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
        console.log(IDs)
        try {
            IDs.forEach(id => {
                promiseIDs.push(fetch(`${this.API_BASE}${id}`, { method: "GET" }))
            });
            const responses = await Promise.all(promiseIDs);
            const result = await Promise.all(responses.map(r => r.json()));
            return result.map(r => r.name)
        } catch (e) {
            return false;
        }
    }
}

