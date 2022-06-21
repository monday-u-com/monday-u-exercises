const { NOT_A_POKEMON } = require("./globalConsts/GlobalConstants.js");
const fs = require("fs");
const PokemonClient = require("../clients/pokemon_client.js");
const path = require("path");

class ItemManager {
  constructor() {
    this.pokedex = PokemonClient;
    this.tasksFile = "../DB/tasks.json";
    this.cacheFile = "../DB/pokemonsCache.json";
    try {
      this.tasks = this.getTasks();
    } catch (e) {
      this.tasks = [];
    }
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
      return await this.addCatchPokemonTask(taskInput);
    } else {
      const isAdded = this.addTaskToFile(taskInput, isCompleted);
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
      this.addResponsesToTasks(input, response, true);
      return response;
    } else {
      response = await this.getPokemonsToAdd(input);
    }
    if (response === false) {
      return false;
    } else {
      this.addResponsesToTasks(input, response, false);
      return true;
    }
  }

  async getPokemonsToAdd(input) {
    const response = await this.pokedex.getPokemonsNamesAndTypes(input);
    if (response === NOT_A_POKEMON) {
      return false;
    } else return response;
  }

  addResponsesToTasks(input, response, isFromCache) {
    if (!isFromCache) {
      this.saveResponseToCache(input, response);
    }

    response.forEach((pokemon) => {
      this.addTaskToFile(pokemon, false);
    });
  }

  addTaskToFile(taskInput, isCompleted) {
    const isTaskExist = this.tasks.find((task) => task.content === taskInput);
    if (isTaskExist) {
      return false;
    } else {
      const task = {
        id: this.tasks.length + 1,
        content: taskInput,
        isCompleted: isCompleted,
      };
      this.tasks.push(task);
      this.saveTasksToFile();
      return true;
    }
  }

  toggleCompleted(id) {
    const task = this.tasks.find((task) => task.id == id);
    if (task) {
      task.isCompleted = !task.isCompleted;
      this.saveTasksToFile();
      return true;
    }
    return false;
  }

  removeTask(id) {
    const task = this.tasks.find((task) => {
      return task.id == id;
    });
    if (task) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
      this.updateTaskIds();
      this.saveTasksToFile();
      return true;
    } else return false;
  }

  updateTaskIds() {
    this.tasks.forEach((task, index) => {
      task.id = index + 1;
    });
  }

  removeAllTasks() {
    this.tasks = [];
    this.saveTasksToFile();
  }

  saveTasksToFile() {
    fs.writeFileSync(
      path.join(__dirname, this.tasksFile),
      JSON.stringify(this.tasks)
    );
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

  getTasks() {
    const tasks = fs.readFileSync(path.join(__dirname, this.tasksFile));
    return JSON.parse(tasks);
  }

  getCache() {
    const cache = fs.readFileSync(path.join(__dirname, this.cacheFile));
    return JSON.parse(cache);
  }

  reSortTasks(newSortedTasks) {
    this.tasks = newSortedTasks;
    this.saveTasksToFile();
  }
}

module.exports = new ItemManager();
