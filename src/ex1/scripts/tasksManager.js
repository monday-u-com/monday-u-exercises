import { PokemonClient } from "./PokemonClient.js";

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
    const isTaskExist = this.tasks.find((task) => task[0] === taskInput);
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
    console.log("add task in TaskManeger");
    const isPokemon = await this.tryFetchAndAddPokemons(taskInput);
    if (isPokemon) {
      return true;
    } else {
      const isAdded = this.pushingTaskAndSave(taskInput, isCompleted);
      return isAdded;
    }
  }

  async tryFetchAndAddPokemons(input) {
    console.log("tryFetchAndAddPokemons");
    const response = await this.pokedex.getPokemonsNamesAndTypes(input);
    if (response === -1) {
      return false;
    } else {
      response.forEach((res) => {
        this.pushingTaskAndSave(res, false);
      });
      return true;
    }
  }

  removeTask(taskContent) {
    const index = this.tasks.find((task) => task[0] === taskContent);
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
  }

  toggleCompleted(taskID) {
    const task = this.tasks.find((task) => task[0] == taskID);
    task[2] = !task[2];
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
