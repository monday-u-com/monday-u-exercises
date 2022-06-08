
class PokemonClient {
    constructor() {
        this.API_BASE = 'https://pokeapi.co/api/v2';
    }

    async getPokemonNameById(id) {
        try {
            const response = await fetch(`${this.API_BASE}/pokemon-form/${id}/`)
            if(response.status === 404){
                return `Pokemon with ID ${id} was not found`;
            }
            const result = await response.json();
            return `Catch ${result.pokemon.name}`;
        } catch(err){
            console.log(err);
        } 
    }

}
const pokemon = new PokemonClient()
