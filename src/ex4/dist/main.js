/* eslint-disable camelcase */
import DomManager from './services/DomManager.js';
import {
  GetResourceRequest, AddNewResourceRequest, DeleteResourceRequest, PatchResourceRequest, PutResourceRequest
} from './clients/ApiRequest.mjs';
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
      this.SortTasksByName();
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
      this.dom_manager.CreateLoader();
      // clear error message
      this.dom_manager.ClearErrorEmptyTask();
      try {
        // send the task to item manager      
        const add_promise = Promise.resolve(AddNewResourceRequest('task', { task: task_text_from_user }));
        // wait to get response before re-rendering
        const add_response = await add_promise;
        // status 201 is for created
        if (add_response.status !== 201) 
          this.tasks.push(add_response.error);
      }
      catch (error) {
        this.ShowError(error);
        this.DestroyError();
      }
      this.RerenderFunctionWrapper();
      this.dom_manager.DeleteLoader();
    } else {
      this.dom_manager.ShowErrorEmptyTaskInput();
      this.ShowError("Input cant be empty");
      this.DestroyError();
    } 
  }

  /**
     * removes task from array
     * @param {Event} event click event object
     */
  async RemoveTodo(event) {    
    const task_id = event.currentTarget.id;
    try {
      this.dom_manager.CreateLoader();
      const delete_promise = Promise.resolve(DeleteResourceRequest(`task/${task_id}`));
      // wait to get response before re-rendering
      await delete_promise;
      this.dom_manager.DeleteLoader();
    } catch (error) {
      this.ShowError(error);
      this.DestroyError();
    }
    this.RerenderFunctionWrapper();
  }

  /**
     * toggle complete task
     * @param {Event} event click event object
     */
  async CompleteTodo(event) {
    const task_id = event.currentTarget.id;
    try {
      this.dom_manager.CreateLoader();
      const complete_promise = Promise.resolve(PatchResourceRequest(`task/${task_id}`));
      // wait to get response before re-rendering
      await complete_promise;
      this.dom_manager.DeleteLoader();
    } catch (error) {
      this.ShowError(error);
      this.DestroyError();
    }
    this.RerenderFunctionWrapper();
  }

  /**
     * clear all tasks in array and log it to the file
     */
  async ClearAllTasks() {    
    try {
      this.dom_manager.CreateLoader();
      const delete_promise = Promise.resolve(DeleteResourceRequest('task'));
      // wait to get response before re-rendering
      await delete_promise;
      this.dom_manager.DeleteLoader();
    } catch (error) {
      this.ShowError(error);
      this.DestroyError();
    }
    this.RerenderFunctionWrapper();
  }

  /**
     * sort tasks by name
     */
  async SortTasksByName() {    
    try {
      this.dom_manager.CreateLoader();
      const sort_promise = Promise.resolve(PutResourceRequest('task/sortbyname', {}));
      // wait to get response before re-rendering
      await sort_promise;
      this.dom_manager.DeleteLoader();
    } catch (error) {
      this.ShowError(error);
      this.DestroyError();
    }
    this.RerenderFunctionWrapper();
  }

  /**
     * function to wrap the re-render
     */
  async RerenderFunctionWrapper() {
    try {
      const tasks = await GetResourceRequest('task');
      this.tasks = tasks.tasks;
      this.dom_manager.RenderDomFromArray(this.tasks, (event) => {
        // delete task call beck
        this.RemoveTodo(event);
      }, (event) => {
        // complete task call back
        this.CompleteTodo(event);
      });
    }
    catch (error) {
      this.ShowError(error);
      this.DestroyError();
    }    
  }

  async ShowError(error) {
    this.dom_manager.ShowErrorElement(error);
  }

  async DestroyError() {
    setTimeout(() => {
      this.dom_manager.DestroyErrorElement();
    }, 3500);
  }
}

const main = new Main();

document.addEventListener('DOMContentLoaded', async () => {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  try {
    main.dom_manager.CreateLoader();
    const tasks = GetResourceRequest('task');
    const pokemons = GetResourceRequest('pokemon');
    const results = await Promise.all([tasks, pokemons]);
    const [task_result, pokemon_result] = results;
    main.init(task_result.tasks, pokemon_result.pokemons);
    main.dom_manager.DeleteLoader();
  } catch (error) {
    main.ShowError(error);
    main.DestroyError();
  }
});
