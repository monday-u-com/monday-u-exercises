import { PokemonClient } from "./PokemonClient.js";
import { TASK_ID, TASK_CONTENT, TASK_COMPLETED } from "./GlobalConstants.js";

export class TasksManeger {
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
    if (this.isInputSetOfPokemonIDs(taskInput)) {
      return await this.addCatchPokemonTask(taskInput);
    } else if (this.pokedex.isPokemonNamesOnly(taskInput)) {
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
    } else if (response.includes("Pokemon with id")) {
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
    if (response === "Not a pokemon") {
      return false;
    } else if (response.includes("Pokemon with id")) {
      console.log(response);
      return response;
    } else {
      return response;
    }
  }

  pushingTaskAndSave(taskInput, isCompleted) {
    const isTaskExist = this.tasks.find(
      (task) => task[TASK_CONTENT] === taskInput
    );
    if (!isTaskExist) {
      this.tasks.push([this.counterID, taskInput, isCompleted]);
      this.counterID++;
      this.saveCounterIDToLocalStorage();
      this.saveTasksToLocalStorage();
      return true;
    } else {
      return false;
    }
  }

  removeTask(taskID) {
    this.tasks = this.tasks.filter((task) => task[TASK_ID] != taskID);
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
    const task = this.tasks.find((task) => task[TASK_ID] == taskID);
    task[TASK_COMPLETED] = !task[TASK_COMPLETED];
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

  reSortTasks(HTMLTaskList) {
    this.tasks = [];
    HTMLTaskList.forEach((taskDiv) => {
      const taskContent = taskDiv.querySelector("p").textContent;
      const isCompleted = taskDiv.classList.contains("task-completed");
      this.addTask(taskContent, isCompleted);
    });
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}
