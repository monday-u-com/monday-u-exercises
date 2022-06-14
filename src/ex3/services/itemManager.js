import PokemonClient from "./pokemonClient.js";
import Item from "../models/item.js";
import * as config from "../conf/conf.js";
import fs from "node:fs";
import chalk from "chalk";

const ID_INIT_KEY = 2000;
class ItemManager {
  constructor() {
    this.itemList = [];
    this.pokemonClient = new PokemonClient();
    this.idGenerator = ID_INIT_KEY;
  }

   load() {
    try {
      if (!fs.existsSync(config.DB_PATH_FILENAME)) {
        this.createStorageFile(
          config.DB_PATH_DIRECTORY,
          config.DB_PATH_FILENAME
        );
      }
      this.itemList =  JSON.parse(fs.readFileSync(config.DB_PATH_FILENAME));
      this.idGenerator = ID_INIT_KEY + this.itemList.length;
    } catch (err) {
      console.error("cannot load", err);
    }
  }

  createStorageFile(dirpath, filepath) {
    try {
      fs.mkdirSync(dirpath, { recursive: true });
      fs.writeFileSync(filepath, JSON.stringify([]));
    } catch (e) {
      console.error(`cannot create file ${filepath}`, e);
    }
  }

  save() {
    try {
      fs.writeFileSync(config.DB_PATH_FILENAME, JSON.stringify(this.itemList));
    } catch (error) {
      console.error("cannot save", error);
    }
  }

  addMultipleTasksToList(tasks) {
    for (let task of tasks) {
      this.addToItemList(task, false);
    }
  }

   async addToItemList(itemTextValue, isPokemon, pokemonData) {
    

    if (isPokemon) {
      this.item = new Item(
        itemTextValue,
        this.idGenerator,
        isPokemon,
        pokemonData.sprites.front_default
      );
    } else {
      this.item = new Item(itemTextValue, this.idGenerator, isPokemon);
    }
    this.idGenerator++;
    this.itemList.push(this.item);
     await this.save();
    console.log(chalk.greenBright(`${itemTextValue} added successfully!`));
  }

  isPokemonExists(pokemonName) {
    

    for (let item of this.itemList) {
      if (item.isPokemon && item.name === pokemonName) {
        return true;
      }
    }
    return false;
  }

  removeFromItemListByName(textItem) {
    this.load();

    this.itemList = this.itemList.filter((item) => item.name !== textItem);
    this.save();
  }

  removeFromItemListByIndex(itemIndex) {
    this.load();

    this.itemList = this.itemList.filter(
      (item) => this.itemList[itemIndex - 1] !== item
    );
    this.save();
  }
}
export default ItemManager;
