/* eslint-disable camelcase */
import DomManager from './DomManager';
import {
  GetResourceRequest, AddNewResourceRequest, DeleteResourceRequest, PatchResourceRequest,
} from './ApiRequest';
// Implement the `Main` class here

class Main {
  constructor() {
    this.dom_manager = new DomManager();
    this.pokemons = [];
    this.tasks = [];
  }

  /**
     * init all event listeners and image animation
     */
  async init(tasks, pokemons) {
    this.tasks = tasks;
    this.pokemons = pokemons;

    this.dom_manager.add_task_button.addEventListener('click', () => {
      this.AddButtonCallBack();
    });

    // on enter key press event
    this.dom_manager.task_input.addEventListener('keypress', (event) => {
      this.dom_manager.AddNewTaskByKeyPress(event);
    });

    this.dom_manager.clear_all_button.addEventListener('click', () => {
      this.ClearAllTasks();
    });

    this.dom_manager.sort_by_name_button.addEventListener('click', () => {
      try {
        this.SortTasksByName();
      } catch (error) {
        console.log(error);
      }
      this.RerenderFunctionWrapper();
    });
    this.RerenderFunctionWrapper();
    setInterval(this.dom_manager.PokemonImageAnimation, 500);

    this.dom_manager.AddPokemonsToDataList(this.pokemons);
  }

  /**
     * add button call back function
     */
  async AddButtonCallBack() {
    const task_text_from_user = this.dom_manager.task_input.value;
    // check if input is not empty
    if (task_text_from_user) {
      // clear error message
      this.dom_manager.ClearErrorEmptyTask();
      // send the task to item manager
      const add_promise = Promise.resolve(AddNewResourceRequest('task', { task: task_text_from_user }));
      // wait to get response before re-rendering
      await add_promise;
      // get the updated tasks
      const tasks = GetResourceRequest('task');
      Promise.all([add_promise, tasks]).then((results) => {
        if (results[0].status === 201) {
          [, this.tasks] = results;
        } else {
          this.tasks.push(results[0].error);
        }
        this.RerenderFunctionWrapper();
      });
    } else { this.dom_manager.ShowErrorEmptyTaskInput(); } // set empty error message
  }

  /**
     * removes task from array
     * @param {Event} event click event object
     */
  async RemoveTodo(event) {
    const task_id = event.currentTarget.id;
    const delete_promise = Promise.resolve(DeleteResourceRequest(`task/${task_id}`));
    // wait to get response before re-rendering
    await delete_promise;
    // get the updated tasks
    const tasks = GetResourceRequest('task');
    Promise.all([delete_promise, tasks]).then((results) => {
      [, this.tasks] = results;
      this.RerenderFunctionWrapper();
    });
  }

  /**
     * toggle complete task
     * @param {Event} event click event object
     */
  async CompleteTodo(event) {
    const task_id = event.currentTarget.id;
    const complete_promise = Promise.resolve(PatchResourceRequest(`task/${task_id}`));
    // wait to get response before re-rendering
    await complete_promise;
    // get the updated tasks
    const tasks = GetResourceRequest('task');
    Promise.all([complete_promise, tasks]).then((results) => {
      [, this.tasks] = results;
      this.RerenderFunctionWrapper();
    });
  }

  /**
     * clear all tasks in array and log it to the file
     */
  async ClearAllTasks() {
    const delete_promise = Promise.resolve(DeleteResourceRequest('task'));
    // wait to get response before re-rendering
    await delete_promise;
    // get the updated tasks
    const tasks = GetResourceRequest('task');
    Promise.all([delete_promise, tasks]).then((results) => {
      [, this.tasks] = results;
      this.RerenderFunctionWrapper();
    });
  }

  /**
     * sort tasks by name
     */
  async SortTasksByName() {
    const sort_promise = Promise.resolve(PatchResourceRequest('task/sortbyname', {}));
    // wait to get response before re-rendering
    await sort_promise;
    // get the updated tasks
    const tasks = GetResourceRequest('task');
    Promise.all([sort_promise, tasks]).then((results) => {
      [, this.tasks] = results;
      this.RerenderFunctionWrapper();
    });
  }

  /**
     * function to wrap the re-render
     */
  RerenderFunctionWrapper() {
    this.dom_manager.RenderDomFromArray(this.tasks, (event) => {
      // delete task call beck
      this.RemoveTodo(event);
    }, (event) => {
      // complete task call back
      this.CompleteTodo(event);
    });
  }
}

const main = new Main();

document.addEventListener('DOMContentLoaded', async () => {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  try {
    const tasks = GetResourceRequest('task');
    const pokemons = GetResourceRequest('pokemon');
    Promise.all([tasks, pokemons]).then((results) => {
      main.init(results[0], results[1]);
    });
  } catch (error) {
    console.log(error);
  }
});
