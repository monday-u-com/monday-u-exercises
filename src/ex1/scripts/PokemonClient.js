export class PokemonClient {
  constructor() {
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
        return this.createNotFoundResponse(namesList[0]);
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

  createNotFoundResponse(input) {
    const resString = `Pokemon with id ${input} was not found`;
    return resString;
  }
}
