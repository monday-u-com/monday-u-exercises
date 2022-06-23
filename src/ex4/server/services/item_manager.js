const { NOT_A_POKEMON } = require("./globalConsts/GlobalConstants.js");
const fs = require("fs");
const PokemonClient = require("../clients/pokemon_client.js");
const path = require("path");
const { Item } = require("../db/models");

class ItemManager {
  constructor() {
    this.pokedex = PokemonClient;
    this.tasksFile = "../db/tasks.json";
    this.cacheFile = "../db/pokemonsCache.json";
    this.tasks = [];
  }

  getTasksLength() {
    return this.tasks.length;
  }

  isInputSetOfPokemonIDs(input) {
    const regex = /^[0-9,]+$/;
    return regex.test(input);
  }

  async addTask(taskInput, isCompleted) {
    if (
      this.isInputSetOfPokemonIDs(taskInput) ||
      this.pokedex.isPokemonNamesOnly(taskInput)
    ) {
      const res = await this.addCatchPokemonTask(taskInput);

      return res;
    } else {
      const isAdded = await this.addTaskToFile(taskInput, isCompleted);
      return isAdded;
    }
  }

  getResponseFromCache(input) {
    const cache = this.getCache();
    if (cache[input]) {
      return cache[input];
    }
    return null;
  }

  async addCatchPokemonTask(input) {
    let response = null;
    if ((response = this.getResponseFromCache(input))) {
      await this.addResponsesToTasks(input, response, true);
      return response;
    } else {
      response = await this.getPokemonsToAdd(input);
      if (response === false) {
        return false;
      } else {
        const res = await this.addResponsesToTasks(input, response, false);

        return true;
      }
    }
  }

  async getPokemonsToAdd(input) {
    const response = await this.pokedex.getPokemonsNamesAndTypes(input);
    if (response === NOT_A_POKEMON) {
      return false;
    } else return response;
  }

  async addResponsesToTasks(input, response, isFromCache) {
    if (!isFromCache) {
      this.saveResponseToCache(input, response);
    }

    for (const pokemon of response) {
      await this.addTaskToFile(pokemon, false);
    }
    return true;
  }

  async addTaskToFile(taskInput, isCompleted) {
    const isTaskExist = this.tasks.find((task) => task.itemName === taskInput);
    if (isTaskExist) {
      return false;
    } else {
      const task = {
        itemName: taskInput,
        status: isCompleted,
        doneAt: null,
      };
      this.tasks.push(task);
      return await this.saveTaskToDB(task);
    }
  }

  async toggleCompleted(id) {
    const task = this.tasks.find((task) => {
      return task.id == id;
    });

    if (task) {
      if (task.status)
        await Item.update(
          { status: !task.status, doneAt: null },
          { where: { id: task.id } }
        );
      else
        await Item.update(
          { status: !task.status, doneAt: new Date() },
          { where: { id: task.id } }
        );
      task.status = !task.status;
      return task;
    }
  }

  async saveTaskToDB(task) {
    try {
      await Item.create(task);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  async RemoveTaskFromDB(taskID) {
    this.tasks = this.tasks.filter((task) => task.id != taskID);
    await Item.destroy({
      where: {
        id: taskID,
      },
    });
  }

  async RemoveAllTasksFromDB() {
    this.tasks = [];
    //remove all the tasks from Item table
    await Item.destroy({
      where: {},
      truncate: true,
    });
  }

  saveResponseToCache(input, response) {
    const time = new Date().getTime();
    const cache = this.getCache();
    cache[input] = response;
    cache["time"] = time;
    fs.writeFileSync(
      path.join(__dirname, this.cacheFile),
      JSON.stringify(cache)
    );
  }

  async getTasks() {
    const itemsFromDB = await Item.findAll();
    const tasks = [];
    itemsFromDB.forEach((item) => {
      tasks.push(item.dataValues);
    });
    this.tasks = tasks;
    return tasks;
  }

  getCache() {
    const cache = fs.readFileSync(path.join(__dirname, this.cacheFile));
    return JSON.parse(cache);
  }

  reSortTasks(newSortedTasks) {
    this.tasks = newSortedTasks;
  }
}

module.exports = new ItemManager();
