import pokemonClinet from "../clients/pokemonClient.js";
import { promises as fs } from "fs";
class ItemManager {
  constructor() {
    this.itemsArray = [];
    this.newItems = [];
    this.jsonFile = "tasks_json.json";
  }

  async getAll() {
    try {
      const todoJsonFile = await fs.readFile(this.jsonFile);
      this.itemsArray = JSON.parse(todoJsonFile.toString());
      return this.itemsArray;
    } catch (err) {
      return this.itemsArray;
    }
  }

  async deleteAll() {
    this.itemsArray = [];
    this.newItems = [];
    await fs.writeFile(this.jsonFile, JSON.stringify(this.itemsArray));
  }

  async readFile() {
    try {
      const todoJsonFile = await fs.readFile(this.jsonFile);
      this.itemsArray = JSON.parse(todoJsonFile.toString());
    } catch (err) {
      await fs.writeFile(this.jsonFile, JSON.stringify(this.itemsArray));
    }
  }
  async checkByPokemonName(pokemon) {
    const isExist = this.exsitsPokemon(pokemon);
    if (!isExist) {
      const task = this.pokemonInit(
        true,
        pokemon.name,
        pokemon.sprites.front_default,
        pokemon.id
      );
      this.itemsArray.push(task);

      await fs.writeFile(this.jsonFile, JSON.stringify(this.itemsArray));
      return [task];
    }
    return this.newItems;
  }
  async getPokemonById(filteredArr) {
    try {
      const pokemons = await pokemonClinet.fetchPokemon(filteredArr);

      pokemons.forEach((pokemon) => {
        const task = this.pokemonInit(
          true,
          pokemon.name,
          pokemon.sprites.front_default,
          pokemon.id
        );
        this.itemsArray.push(task);
        this.newItems.push(task);
      });
      await fs.writeFile(this.jsonFile, JSON.stringify(this.itemsArray));
    } catch (e) {
      let pokemonId = "";
      filteredArr.forEach((task) => {
        pokemonId += task + " ";
      });
      const task = this.pokemonInit(
        false,
        `Cannot Find Pokemon with : ${pokemonId} ID`
      );
      this.itemsArray.push(task);
      this.newItems.push(task);
      await fs.writeFile(this.jsonFile, JSON.stringify(this.itemsArray));
    }
    return this.newItems;
  }
  generateId() {
    let maxId = 0;
    this.itemsArray.forEach((item) => {
      maxId = Math.max(maxId, item.itemId);
    });
    const newId = maxId + 1;
    return newId;
  }

  async addItem(isPokemon, inputArr) {
    this.newItems = [];
    this.readFile();
    if (!isPokemon) {
      //check pokemon by name
      const isPokemon = await pokemonClinet.checkByPokemonName(inputArr[0]);
      if (isPokemon) return this.checkByPokemonName(isPokemon);
    }
    if (isPokemon) {
      const filteredArr = this.itemToAdd(inputArr);
      if (filteredArr.length === 0) return this.newItems;
      return this.getPokemonById(filteredArr);
    } else {
      const task = this.pokemonInit(false, inputArr[0]);
      this.itemsArray.push(task);
      this.newItems.push(task);
      await fs.writeFile(this.jsonFile, JSON.stringify(this.itemsArray));
      return this.newItems;
    }
  }

  pokemonInit(isPokemon, item, imageUrl = "", pokemonId = "") {
    const itemId = this.generateId();
    const task = {
      itemId: itemId,
      isPokemon: isPokemon,
      item: item,
      imageUrl: imageUrl,
      pokemonId: pokemonId,
    };
    return task;
  }

  async deleteItem(itemId) {
    try {
      this.readFile();
      const idx = this.itemsArray.findIndex((item) => item.itemId === itemId);
      if (idx === -1) throw "err";
      this.itemsArray.splice(idx, 1);
      await fs.writeFile(this.jsonFile, JSON.stringify(this.itemsArray));
    } catch (err) {
      throw `There is no task with id: ${itemId} `;
    }
  }
  itemToAdd(arr) {
    const pokemonsIdArr = this.itemsArray
      .filter((obj) => obj.isPokemon)
      .map((obj) => obj.pokemonId.toString());
    return arr.filter((id) => !pokemonsIdArr.includes(id));
  }
  exsitsPokemon(obj) {
    return this.itemsArray.some(
      (item) => item.isPokemon && item.pokemonId === obj.id
    );
  }
}
export default new ItemManager();
