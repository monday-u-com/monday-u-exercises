const {
  ALL_POKEMONS_NAMES_LIST,
} = require("../services/globalConsts/pokemonNamesList.js");
const {
  NOT_A_POKEMON,
} = require("../services/globalConsts/GlobalConstants.js");

const axios = require("axios");

class PokemonClient {
  constructor() {
    this.pokemonNames = ALL_POKEMONS_NAMES_LIST;
    this.URL = "https://pokeapi.co/api/v2/pokemon/";
  }

  async getPokemonsNamesAndTypes(input) {
    const namesList = this.parseInputToList(input);
    const promises = namesList.map(async (name) => {
      const response = await axios.get(`${this.URL}${name}`);
      const data = response.data;
      return this.createResponse(data);
    });

    return Promise.all(promises).catch((err) => {
      if (namesList.length === 1 && this.isInputNumbersOnly(namesList[0])) {
        return this.createIDNotFoundResponse(namesList[0]);
      } else if (namesList.length > 1 && this.isListOfPokemonIds(namesList)) {
        return this.createUnableToFetchListOFIds(namesList);
      } else {
        return NOT_A_POKEMON;
      }
    });
  }

  isInputNumbersOnly(input) {
    const regex = /^[0-9]+$/;
    return regex.test(input);
  }

  isListOfPokemonIds(list) {
    return list.every((id) => this.isInputNumbersOnly(id) === true);
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

  createUnableToFetchListOFIds(idsList) {
    const resString = `Failed to fetch pokemons with this input ${idsList.join(
      ", "
    )}`;
    return resString;
  }
}

module.exports = new PokemonClient();
