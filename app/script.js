const addTaskButton = document.querySelector(ADD_TASK_BTN_SELECTOR);
const taskInput = document.querySelector(TASK_INPUT_SELECTOR);
const allTasksContainer = document.querySelector(ALL_TASKS_CONTAINER_SELECTOR);
const pendingTasksCounter = document.querySelector(TASKS_COUNTER_SELECTOR);
const clearButton = document.querySelector(CLEAR_BTN_SELECTOR);
const sortDownButton = document.querySelector(SORT_DOWN_BTN_SELECTOR);
const sortUpButton = document.querySelector(SORT_UP_BTN_SELECTOR);
const sortButtonsContainer = document.querySelector(SORT_BTNS_SELECTOR);
const pokemonImagesContainer = document.querySelector(POKEMON_IMAGES_SELECTOR);
const pokemonCatchText = document.querySelector(POKEMON_TEXT_SELECTOR);

import ItemManager from "./item-manager.js";
const tasks = new ItemManager(renderTasks);
import PokemonClient from "../cli/pokemon-client.js";
const pokemonClient = new PokemonClient();

clearButton.onclick = () => tasks.clear();
sortDownButton.onclick = () => tasks.sortDown();
sortUpButton.onclick = () => tasks.sortUp();
addTaskButton.onclick = () => addTask();
taskInput.onkeypress = (e) => {
   if (e.key === "Enter") addTask();
};

let allPokemonNames = JSON.parse(localStorage.getItem("allPokemonNames"));
if (!allPokemonNames) getAllPokemonNames();

async function getAllPokemonNames() {
   allPokemonNames = await pokemonClient.getAllPokemonNames();
   localStorage.setItem("allPokemonNames", JSON.stringify(allPokemonNames));
}

function renderTasks(toAnimate) {
   let lastTaskAdded;
   while (allTasksContainer.firstChild) {
      allTasksContainer.removeChild(allTasksContainer.lastChild);
   }
   tasks.items.forEach((item) => {
      const taskContainer = createTaskContainer();
      const newTask = createNewTask(taskContainer, item);
      const deleteTask = createDeleteTaskButton(taskContainer);
      addHoverReveal(taskContainer, deleteTask, newTask);
      lastTaskAdded = newTask;
   });

   pendingTasksCounter.textContent = tasks.pendingTasks;
   if (tasks.pendingTasks === 1) {
      sortButtonsContainer.classList.add(VISIBLE_CLASS);
   } else if (tasks.pendingTasks === 0) {
      sortButtonsContainer.classList.remove(VISIBLE_CLASS);
   }

   if (toAnimate) createTaskAnimation(lastTaskAdded);
}

async function addTask() {
   const taskUserInput = taskInput.value;
   taskInput.value = "";
   if (taskUserInput.trim().length === 0) {
      alert("Please fill in a task");
   } else if (
      taskUserInput
         .replace(/\s/g, "")
         .split(",")
         .every((elem) => !isNaN(elem) || allPokemonNames.includes(elem))
   ) {
      let pokemonIDS = taskUserInput.replace(/\s/g, "").split(","); // "1, 2, 3" => [1,2,3]
      const pokemonData = await Promise.all(pokemonIDS.map((id) => pokemonClient.getPokemon(id)));
      pokemonData.forEach((pokemon, i) => {
         pokemonTasksHandle(pokemon, pokemonIDS, i);
      });
   } else {
      tasks.add(taskUserInput);
   }
}

function pokemonTasksHandle(pokemon, pokemonIDS, i) {
   if (pokemon) {
      let pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      const pokemonTypes = pokemonClient.getPokemonTypes(pokemon);
      const taskToAdd = `Catch ${pokemonName} of type ${pokemonTypes}`;
      if (tasks.items.includes(taskToAdd)) {
         alert(`${pokemonName} already exists in your tasks. Please try another Pokemon.`);
      } else {
         addPokemonImage(pokemon);
         tasks.add(taskToAdd);
      }
   } else {
      tasks.add(`Pokemon ID ${pokemonIDS[i]} does not exist`);
   }
}

function addPokemonImage(pokemon) {
   const pokemonImage = document.createElement("img");
   pokemonImage.src = pokemon.sprites.front_default;
   pokemonImage.classList.add("pokemon-image");
   pokemonImagesContainer.append(pokemonImage);
   pokemonCatchText.classList.add(VISIBLE_CLASS);
}

function createTaskContainer() {
   const taskContainer = document.createElement("li");
   taskContainer.classList.add(TASKS_CONTAINER_SELECTOR.slice(1));
   allTasksContainer.append(taskContainer);

   return taskContainer;
}

function createNewTask(taskContainer, item) {
   const newTask = document.createElement("div");
   newTask.textContent = item;
   newTask.classList.add("task");
   taskContainer.append(newTask);
   newTask.onclick = () => alert(newTask.textContent);

   return newTask;
}

function createDeleteTaskButton(taskContainer) {
   const deleteTask = document.createElement("div");
   const i = document.createElement("i");
   i.classList.add("fa-solid", "fa-trash");
   deleteTask.appendChild(i);
   deleteTask.classList.add(DEL_BTN_CLASS);
   taskContainer.append(deleteTask);

   deleteTask.onclick = () => {
      const index = Array.from(taskContainer.parentNode.children).indexOf(taskContainer);
      tasks.remove(index, false);
   };

   return deleteTask;
}

function addHoverReveal(taskContainer, deleteTask, newTask) {
   taskContainer.onmouseover = () => {
      deleteTask.classList.add(VISIBLE_CLASS);
   };

   taskContainer.onmouseout = () => {
      deleteTask.classList.remove(VISIBLE_CLASS);
   };
}

function createTaskAnimation(newTask) {
   const taskAnimation = [
      { transform: "scale(0)" },
      { transform: "scale(1.1)" },
      { transform: "scale(1)" },
   ];
   newTask.animate(taskAnimation, 600);
}
