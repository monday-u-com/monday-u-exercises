const { NOT_A_POKEMON } = require("./globalConsts/GlobalConstants.js");
const fs = require("fs");
const PokemonClient = require("../clients/pokemon_client.js");
const path = require("path");
const { Item } = require("../db/models");
const { log } = require("console");

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
      const res = await this.addTaskToFile(taskInput, isCompleted);
      return res;
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
      const res = await this.addResponsesToTasks(input, response, true);
      return res;
    } else {
      response = await this.getPokemonsToAdd(input);
      if (response === false) {
        return false;
      } else {
        const res = await this.addResponsesToTasks(input, response, false);
        return res;
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
    const res = [];
    if (!isFromCache) {
      this.saveResponseToCache(input, response);
    }

    for (const pokemon of response) {
      const item = await this.addTaskToFile(pokemon, false);
      res.push(item);
    }
    return res;
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
      return await this.saveTaskToDB(task);
    }
  }

  async updateTask(taskID, taskToUpdate) {
    const task = this.tasks.find((task) => task.id == taskID);
    if (task) {
      if (task.status === false && taskToUpdate.status === true) {
        task.doneAt = new Date();
        await Item.update(
          {
            itemName: taskToUpdate.itemName,
            status: taskToUpdate.status,
            doneAt: new Date(),
          },
          { where: { id: taskID } }
        );
      } else if (task.status === true && taskToUpdate.status === false) {
        task.doneAt = null;
        await Item.update(
          {
            itemName: taskToUpdate.itemName,
            status: taskToUpdate.status,
            doneAt: null,
          },
          { where: { id: taskID } }
        );
      } else {
        await Item.update(
          { itemName: taskToUpdate.itemName, status: taskToUpdate.status },
          { where: { id: taskID } }
        );
      }
      task.itemName = taskToUpdate.itemName;
      task.status = taskToUpdate.status;
      return task;
    }
  }

  async saveTaskToDB(task) {
    let item;
    try {
      item = await Item.create(task);
    } catch (err) {
      console.log(err);
      return false;
    }
    this.tasks.push(item.dataValues);
    return item.dataValues;
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

const itemManager = new ItemManager();
itemManager.getTasks();
module.exports = itemManager;
