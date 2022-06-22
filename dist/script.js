const addTaskButton = document.querySelector(ADD_TASK_BTN_SELECTOR);
const taskInput = document.querySelector(TASK_INPUT_SELECTOR);
const allTasksContainer = document.querySelector(ALL_TASKS_CONTAINER_SELECTOR);
const pendingTasksCounter = document.querySelector(TASKS_COUNTER_SELECTOR);
const clearButton = document.querySelector(CLEAR_BTN_SELECTOR);
const sortDownButton = document.querySelector(SORT_DOWN_BTN_SELECTOR);
const sortUpButton = document.querySelector(SORT_UP_BTN_SELECTOR);
const sortButtonsContainer = document.querySelector(SORT_BTNS_SELECTOR);
const loader = document.querySelector(LOADER_SELECTOR);

import api from "./clients/item-client.js";

renderTasks(false);

clearButton.onclick = async () => {
   loader.classList.add(VISIBLE_CLASS);
   await api.clearTasks();
   renderTasks(false);
};

sortDownButton.onclick = async () => {
   loader.classList.add(VISIBLE_CLASS);
   const sortedTasks = await api.sortTasks("down");
   renderTasks(false, sortedTasks);
};

sortUpButton.onclick = async () => {
   loader.classList.add(VISIBLE_CLASS);
   const sortedTasks = await api.sortTasks("up");
   renderTasks(false, sortedTasks);
};

addTaskButton.onclick = () => addTask();
taskInput.onkeypress = (e) => {
   if (e.key === "Enter") addTask();
};

async function renderTasks(toAnimate, tasks) {
   let lastTaskAdded;
   while (allTasksContainer.firstChild) {
      allTasksContainer.removeChild(allTasksContainer.lastChild);
   }
   if (!tasks) {
      tasks = await api.getAllTasks();
   }
   let pendingTasks = 0;
   tasks.forEach((task) => {
      const taskContainer = createTaskContainer();
      const newTask = createNewTask(taskContainer, task);
      if (task.imageURL) addPokemonImage(newTask, task.imageURL);
      const deleteTask = createDeleteTaskButton(taskContainer, newTask);
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
   loader.classList.remove(VISIBLE_CLASS);
}

async function addTask() {
   const taskUserInput = taskInput.value;
   taskInput.value = "";
   if (taskUserInput.trim().length === 0) {
      alert("Please fill in a task");
   } else {
      loader.classList.add(VISIBLE_CLASS);
      const toRender = await api.addTask(taskUserInput);
      toRender.success ? renderTasks(true) : renderTasks(false);
   }
}

function addPokemonImage(newTask, pokemonImagesURL) {
   const pokemonImage = document.createElement("img");
   pokemonImage.src = pokemonImagesURL;
   pokemonImage.classList.add("pokemon-image");
   newTask.append(pokemonImage);
}

function createTaskContainer() {
   const taskContainer = document.createElement("li");
   taskContainer.classList.add(TASKS_CONTAINER_SELECTOR.slice(1));
   allTasksContainer.append(taskContainer);

   return taskContainer;
}

function createNewTask(taskContainer, task) {
   const newTask = document.createElement("div");
   newTask.textContent = task.text;
   newTask.classList.add("task");
   taskContainer.append(newTask);
   newTask.onclick = () => alert(newTask.textContent);

   return newTask;
}

function createDeleteTaskButton(taskContainer, newTask) {
   const deleteTask = document.createElement("div");
   const i = document.createElement("i");
   i.classList.add("fa-solid", "fa-trash");
   deleteTask.appendChild(i);
   deleteTask.classList.add(DEL_BTN_CLASS);
   taskContainer.append(deleteTask);

   deleteTask.onclick = async () => {
      const taskText = newTask.textContent;
      await api.deleteTask(taskText);
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
