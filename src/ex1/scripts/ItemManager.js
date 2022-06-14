import {
  POKEMON_WITH_ID_NOT_FOUND,
  NOT_A_POKEMON,
  FAILED_TO_FETCH,
} from "./GlobalConstants.js";
import PokemonClient from "./PokemonClient.js";

export class ItemManager {
  constructor() {
    this.tasks = [];
    this.counterID = 0;

    this.pokedex = new PokemonClient();
    this.initFromLocalStorage();
  }

  initFromLocalStorage() {
    if (localStorage.getItem("tasks") !== null) {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    if (localStorage.getItem("counterID") !== null) {
      this.counterID = JSON.parse(localStorage.getItem("counterID"));
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
      const isAdded = this.pushingTaskAndSave(taskInput, isCompleted);
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
      this.pushingTaskAndSave(response, false);
      return true;
    } else {
      response.forEach((pokemon) => {
        this.pushingTaskAndSave(pokemon, false);
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

  pushingTaskAndSave(taskInput, isCompleted) {
    const isTaskExist = this.tasks.find((task) => task.contenr === taskInput);
    if (!isTaskExist) {
      this.tasks.push({
        id: this.counterID,
        content: taskInput,
        completed: isCompleted,
      });
      this.counterID++;
      this.saveCounterIDToLocalStorage();
      this.saveTasksToLocalStorage();
      return true;
    } else {
      return false;
    }
  }

  removeTask(taskID) {
    this.tasks = this.tasks.filter((task) => task.id != taskID);
    this.saveTasksToLocalStorage();
  }

  removeAllTasks() {
    this.tasks = [];
    this.counterID = 0;
    this.saveTasksToLocalStorage();
    this.saveCounterIDToLocalStorage();
  }

  getTasks() {
    return this.tasks;
  }

  toggleCompleted(taskID) {
    const task = this.tasks.find((task) => {
      if (task.id == taskID) {
        return task;
      }
    });
    task.completed = !task.completed;
    this.saveTasksToLocalStorage();
  }

  isEmpty() {
    return this.tasks.length === 0;
  }

  saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  saveCounterIDToLocalStorage() {
    localStorage.setItem("counterID", JSON.stringify(this.counterID));
  }

  pushTaskFromReSort(id, taskContent, isCompleted) {
    this.tasks.push({ id: id, content: taskContent, completed: isCompleted });
    this.saveTasksToLocalStorage();
  }

  reSortTasks(HTMLTaskList) {
    this.tasks = [];
    HTMLTaskList.forEach((taskDiv) => {
      const taskContent = taskDiv.querySelector("p").textContent;
      const isCompleted = taskDiv.classList.contains("task-completed");
      const taskID = taskDiv.getAttribute("id");
      this.pushTaskFromReSort(taskID, taskContent, isCompleted);
    });
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}
