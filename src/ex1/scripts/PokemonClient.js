import { ALL_POKEMONS_NAMES_LIST } from "./PokemonNamesList.js";
export class PokemonClient {
  constructor() {
    this.pokemonNames = ALL_POKEMONS_NAMES_LIST;
    this.URL = "https://pokeapi.co/api/v2/pokemon/";
  }

  async getPokemonsNamesAndTypes(input) {
    const namesList = this.parseInputToList(input);
    const promises = namesList.map(async (name) => {
      const response = await fetch(`${this.URL}${name}`);
      const data = await response.json();
      return this.createResponse(data);
    });

    return Promise.all(promises).catch((err) => {
      if (
        namesList.length === 1 &&
        this.checkIfInputIsOnlyNumbers(namesList[0])
      ) {
        return this.createIDNotFoundResponse(namesList[0]);
      } else {
        return "Not a pokemon";
      }
    });
  }

  checkIfInputIsOnlyNumbers(input) {
    const regex = /^[0-9]+$/;
    return regex.test(input);
  }

  parseInputToList(input) {
    const inputList = input.split(",");
    const res = inputList.map((name) => name.trim());
    return res;
  }

  constructTypesList(types) {
    const typesList = types.map((type) => {
      return type.type.name;
    });
    return typesList;
  }

  createResponse(data) {
    const typesList = this.constructTypesList(data.types);
    const resString = `Catch ${data.name} the ${typesList.join("/")} pokemon`;
    return resString;
  }

  createIDNotFoundResponse(input) {
    const resString = `Pokemon with id ${input} was not found`;
    return resString;
  }

  isPokemonNamesOnly(input) {
    const regex = /^[A-Za-z, ]+$/;
    if (regex.test(input)) {
      const namesInputList = this.parseInputToList(input);
      const isPokemons = namesInputList.every((name) => {
        return this.pokemonNames.includes(name);
      });
      return isPokemons;
    } else {
      return false;
    }
  }

  /* for future use - tried making async creator with static creator - and initilize wiyh list first. didt work well
  async getistAllPokemonsNames() {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=898";
    const response = await fetch(url);
    const data = await response.json();
    const pokemonsNames = data.results.map((pokemon) => {
      return pokemon.name;
    });
    return pokemonsNames;
  }
  */
}
