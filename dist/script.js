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

import api from "./clients/item-client.js";

renderTasks(false);

clearButton.onclick = async () => {
   await api.clearTasks();
   renderTasks(false);
};
sortDownButton.onclick = async () => {
   await api.sortTasks("down");
   renderTasks(false);
};
sortUpButton.onclick = async () => {
   await api.sortTasks("up");
   renderTasks(false);
};

addTaskButton.onclick = () => addTask();
taskInput.onkeypress = (e) => {
   if (e.key === "Enter") addTask();
};

async function renderTasks(toAnimate) {
   let lastTaskAdded;
   while (allTasksContainer.firstChild) {
      allTasksContainer.removeChild(allTasksContainer.lastChild);
   }

   const tasks = await api.getAllTasks();
   let pendingTasks = 0;
   tasks.forEach((item) => {
      const taskContainer = createTaskContainer();
      const newTask = createNewTask(taskContainer, item);
      const deleteTask = createDeleteTaskButton(taskContainer);
      addHoverReveal(taskContainer, deleteTask, newTask);
      lastTaskAdded = newTask;
      pendingTasks++;
   });

   pendingTasksCounter.textContent = pendingTasks;
   if (pendingTasks >= 1) {
      sortButtonsContainer.classList.add(VISIBLE_CLASS);
   } else if (pendingTasks === 0) {
      sortButtonsContainer.classList.remove(VISIBLE_CLASS);
   }

   if (toAnimate) createTaskAnimation(lastTaskAdded);
}

async function addTask() {
   const taskUserInput = taskInput.value;
   taskInput.value = "";
   const tasks = await api.addTask(taskUserInput);
   renderTasks(true);
}

// function addPokemonImage(pokemon) {
//    const pokemonImage = document.createElement("img");
//    pokemonImage.src = pokemon.sprites.front_default;
//    pokemonImage.classList.add("pokemon-image");
//    pokemonImagesContainer.append(pokemonImage);
//    pokemonCatchText.classList.add(VISIBLE_CLASS);
// }

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

   deleteTask.onclick = async () => {
      const index = Array.from(taskContainer.parentNode.children).indexOf(taskContainer);
      const tasks = await api.deleteTask(index);
      renderTasks(false);
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
