const {
  POKEMON_WITH_ID_NOT_FOUND,
  NOT_A_POKEMON,
  FAILED_TO_FETCH,
} = require("./globalConsts/GlobalConstants.js");
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
      const isAdded = this.addToFile(taskInput, isCompleted);
      return isAdded;
    }
  }

  async addCatchPokemonTask(input) {
    //check if in cache first
    let response = null;
    const cache = this.getCache();
    const cacheItem = cache.find((item) => item.input === input);
    if (cacheItem) {
      response = cacheItem.response;
    } else {
      response = await this.getPokemonsToAdd(input);
      this.saveResponseToCache(input, response);
    }
    if (response === false) {
      return false;
    } else if (
      response.includes(POKEMON_WITH_ID_NOT_FOUND) ||
      response.includes(FAILED_TO_FETCH)
    ) {
      this.addToFile(response, false);
      return true;
    } else {
      response.forEach((pokemon) => {
        this.addToFile(pokemon, false);
      });
      return true;
    }
  }

  async getPokemonsToAdd(input) {
    const response = await this.pokedex.getPokemonsNamesAndTypes(input);
    if (response === NOT_A_POKEMON) {
      return false;
    } else return response;
  }

  addToFile(taskInput, isCompleted) {
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
    task.isCompleted = !task.isCompleted;
    this.saveTasksToFile();
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
    const itemToSave = {
      time: time,
      input: input,
      response: response,
    };
    const cache = this.getCache();
    cache.push(itemToSave);
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

  pushTaskFromReSort(id, taskContent, isCompleted) {
    this.tasks.push({ id: id, content: taskContent, completed: isCompleted });
    this.saveTasksToFile();
  }

  reSortTasks(HTMLTaskList) {
    this.tasks = [];
    HTMLTaskList.forEach((taskDiv) => {
      const taskContent = taskDiv.querySelector("p").textContent;
      const isCompleted = taskDiv.classList.contains("task-completed");
      const taskID = taskDiv.getAttribute("id");
      this.pushTaskFromReSort(taskID, taskContent, isCompleted);
    });
    this.saveTasksToFile();
  }
}

module.exports = new ItemManager();
