import {
  NOT_A_POKEMON,
  FAILED_TO_FETCH,
  POKEMON_WITH_ID_NOT_FOUND,
} from "../ex1/scripts/GlobalConstants.js";
import fs from "fs";
import PokemonClient_CLI from "./PokemonClient_cli.js";

export class ItemManage_CLI {
  constructor() {
    this.pokedex = new PokemonClient_CLI();
    this.tasksFile = "./tasks.json";
    try {
      this.tasks = this.getTasks();
    } catch (e) {
      this.tasks = [];
    }
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
    const response = await this.getPokemonsToAdd(input);
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
    const response = await this.pokedex.getPokemonsNamesAndTypesCLI(input);
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
      fs.writeFileSync(this.tasksFile, JSON.stringify(this.tasks));
      return true;
    }
  }

  toggleCompleted(id) {
    const task = this.tasks.find((task) => task.id === id);
    task.isCompleted = !task.isCompleted;
    saveTasksToFile();
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
    saveTasksToFile();
  }

  saveTasksToFile() {
    fs.writeFileSync(this.tasksFile, JSON.stringify(this.tasks));
  }

  getTasks() {
    const tasks = fs.readFileSync(this.tasksFile, "utf8");
    return JSON.parse(tasks);
  }
}
