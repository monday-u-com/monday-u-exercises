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
    if (localStorage.getItem("counterID" != null)) {
      this.counterID = JSON.parse(localStorage.getItem("counterID"));
    }
  }

  isInputIsSetOfPokemonsIDs(input) {
    const regex = /^[0-9,]+$/;
    return regex.test(input);
  }

  async addTask(taskInput, isCompleted) {
    if (this.isInputIsSetOfPokemonsIDs(taskInput)) {
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
      return response;
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
      localStorage.setItem("counterID", JSON.stringify(this.counterID));
      this.saveTasksToLocalStorage();
      return true;
    } else {
      return false;
    }
  }

  removeTask(taskContent) {
    const index = this.tasks.find((task) => task[TASK_ID] === taskContent);
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
  }

  removeAllTasks() {
    this.tasks = [];
    this.saveTasksToLocalStorage();
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
