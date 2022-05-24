export class PokemonClient {
  constructor() {
    this.URL = "https://pokeapi.co/api/v2/pokemon/";
  }

  async getPokemonsNamesAndTypes(input) {
    console.log("getPokemonsNamesAndTypes");
    const namesList = this.parseInputToList(input);
    const promises = namesList.map(async (name) => {
      const response = await fetch(`${this.URL}${name}`);
      const data = await response.json();
      return this.createResponse(data);
    });
    return Promise.all(promises).catch((err) => {
      return -1;
    });
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
}
