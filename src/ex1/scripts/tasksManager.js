import { PokemonClient } from "./PokemonClient.js";
import { TASK_ID, TASK_CONTENT, TASK_COMPLETED } from "./globalConsts.js";


export class TasksManeger {
  constructor() {
    this.tasks = [];
    this.pokedex = new PokemonClient();
    this.counterID = 0;
    if (localStorage.getItem("tasks") !== null) {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    if (localStorage.getItem("counterID" != null)) {
      this.counterID = JSON.parse(localStorage.getItem("counterID"));
    }
  }

  pushingTaskAndSave(taskInput, isCompleted) {
    const isTaskExist = this.tasks.find((task) => task[TASK_ID] === taskInput);
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

  async addTask(taskInput, isCompleted) {
    const isPokemon = await this.tryFetchAndAddPokemons(taskInput);
    if (isPokemon) {
      return true;
    } else {
      const isAdded = this.pushingTaskAndSave(taskInput, isCompleted);
      return isAdded;
    }
  }

  async tryFetchAndAddPokemons(input) {
    const response = await this.pokedex.getPokemonsNamesAndTypes(input);
    if (response === "Not a pokemon") {
      return false;
    } else if (response.includes("Pokemon with id")) {
      this.pushingTaskAndSave(response, false);
      return true;
    } else {
      response.forEach((res) => {
        this.pushingTaskAndSave(res, false);
      });
      return true;
    }
  }

  removeTask(taskContent) {
    const index = this.tasks.find((task) => task[TASK_ID] === taskContent);
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
  }

  toggleCompleted(taskID) {
    const task = this.tasks.find((task) => task[TASK_ID] == taskID);
    task[TASK_COMPLETED] = !task[TASK_COMPLETED];
    this.saveTasksToLocalStorage();
  }

  getTasks() {
    return this.tasks;
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

  isEmpty() {
    return this.tasks.length === 0;
  }
}
