/* eslint-disable camelcase */
import axios from 'axios';
export default class PokemonClient {
  constructor() {
    this.base_url = 'https://pokeapi.co/api/v2/pokemon/';
    this.pokemons_url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';    
  }
  
  /**
  * send a get request to pokemon api with id parse result
  * @param {string} id id
  * @returns {string} parsed result from api
  */
  async FetchRequestById(id) {
    return axios.get(this.base_url.concat(id)).then((response) => {     
     return response.data;
    });
  }

  async FetchAllPokemonsNamesRequest() {
    return axios.get(this.pokemons_url).then((response) => {     
     return response.data.results;
    });
  }
}
