import PokemonClient from "../ex1/scripts/PokemonClient.js";
import fetch from "node-fetch";

export default class PokemonClient_CLI extends PokemonClient {
  async getPokemonsNamesAndTypesCLI(input) {
    const namesList = this.parseInputToList(input);
    const promises = namesList.map(async (name) => {
      const response = await fetch(`${this.URL}${name}`);
      const data = await response.json();
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
}
