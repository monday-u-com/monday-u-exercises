const URL = "https://pokeapi.co/api/v2/pokemon";

export class PokemonClient {
    constructor() {
        this.pokemonName = [];
    }
    fetchPokemonByIdOrName = async (id) => {
        const response = await fetch(`${URL}/${id}`);
        const ans = await response.json();
        return ans;
    };
    getPokemonNameById = async (id) => {
        const pokemon = await this.fetchPokemonByIdOrName(id);
        this.pokemonName = [pokemon.name];
    };
    getPokemonImgByName = async (name) => {
        const pokemon = await this.fetchPokemonByIdOrName(name);
        this.pokemonImgUrl = pokemon.sprites.front_default
        return this.pokemonImgUrl
    }
    catchThemAll = async (idsArray) => {
        this.pokemonName = [];
        await Promise.all(
            idsArray.map(async (id) => {
                const pokemon = await this.fetchPokemonByIdOrName(id);
                this.pokemonName.push(pokemon.name);
            })
        );
    };
}
