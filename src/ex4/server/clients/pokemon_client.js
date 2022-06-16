import axios from "axios";
export default class PokemonClient {
    constructor() {
        this.API_BASE = 'https://pokeapi.co/api/v2';
    }

    async getPokemonNameById(id) {
        try {
            const response = await axios.get(`${this.API_BASE}/pokemon-form/${id}/`)
            const result =  response.data;
            return `Catch ${result.pokemon.name}`;
        } catch(err){
            if(err.response.status === 404){
                return `Pokemon with ID ${id} was not found`;
            }
        } 
    }
}
