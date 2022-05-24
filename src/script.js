const addTaskButton = document.querySelector(ADD_TASK_BTN_SELECTOR);
const taskInput = document.querySelector(TASK_INPUT_SELECTOR);
const allTasksContainer = document.querySelector(ALL_TASKS_CONTAINER_SELECTOR);
const pendingTasksCounter = document.querySelector(TASKS_COUNTER_SELECTOR);
let pendingTasks = 0;
const clearButton = document.querySelector(CLEAR_BTN_SELECTOR);
const sortDownButton = document.querySelector(SORT_DOWN_BTN_SELECTOR);
const sortUpButton = document.querySelector(SORT_UP_BTN_SELECTOR);
const sortButtonsContainer = document.querySelector(SORT_BTNS_SELECTOR);

const tasks = new ItemManager();
const pokemonNames = new PokemonClient();

addTaskButton.onclick = () => {
   renderAndAnimate();
};

taskInput.onkeypress = (e) => {
   if (e.key === "Enter") {
      renderAndAnimate();
   }
};

async function renderAndAnimate() {
   if (await addTask()) {
      const newTask = renderTasks();
      createTaskAnimation(newTask);
   }
}

clearButton.onclick = () => {
   tasks.clear();
   renderTasks();
   pendingTasksUpdate(0);
};

sortDownButton.onclick = () => {
   tasks.sortDown();
   renderTasks();
};

sortUpButton.onclick = () => {
   tasks.sortUp();
   renderTasks();
};

function renderTasks() {
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

   return lastTaskAdded;
}

async function addTask() {
   const taskUserInput = taskInput.value;
   taskInput.value = "";
   const allPokemonNames = await pokemonNames.getAllPokemonNames();
   if (taskUserInput.trim().length === 0) {
      alert("Please fill in a task");

      return false;
   } else if (
      !isNaN(taskUserInput) ||
      allPokemonNames.includes(taskUserInput)
   ) {
      // For single Pokemon entry
      let pokemonData = await pokemonNames.getPokemon(taskUserInput);
      let pokemonID = taskUserInput;
      let render = false;
      render = pokemonTasksHandle(pokemonData, pokemonID, 0);

      return render;
   } else if (
      taskUserInput
         .replace(/\s/g, "")
         .split(",")
         .every((elem) => !isNaN(elem) || allPokemonNames.includes(elem))
   ) {
      // For multiple Pokemons entry
      let pokemonIDS = taskUserInput.replace(/\s/g, "").split(","); // "1, 2, 3" => [1,2,3]
      const pokemonData = await Promise.all(
         pokemonIDS.map((id) => pokemonNames.getPokemon(id))
      );
      let render = false;
      pokemonData.forEach((pokemon, i) => {
         render = pokemonTasksHandle(pokemon, pokemonIDS, 1, i);
      });

      return render;
   } else {
      // For regular boring non-pokemon tasks
      tasks.add(taskUserInput);
      pendingTasksUpdate("+");

      return true;
   }
}

function pokemonTasksHandle(pokemon, pokemonIDS, isMultiplePokemons, i) {
   if (pokemon) {
      let pokemonName =
         pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      const pokemonTypes = getPokemonTypes(pokemon);
      const taskToAdd = `Catch ${pokemonName} of type ${pokemonTypes}`;
      if (tasks.items.includes(taskToAdd)) {
         alert(
            `${pokemonName} already exists in your tasks. Please try another Pokemon.`
         );
         render = false;
      } else {
         tasks.add(taskToAdd);
         pendingTasksUpdate("+");
         render = true;
      }
   } else {
      if (isMultiplePokemons) {
         tasks.add(`Pokemon ID ${pokemonIDS[i]} does not exist`);
      } else {
         tasks.add(`Pokemon ID ${pokemonIDS} does not exist`);
      }

      pendingTasksUpdate("+");
      render = true;
   }

   return render;
}

function getPokemonTypes(pokemon) {
   const pokemonTypes = pokemon.types.map((item) => item.type.name);
   return pokemonTypes.join();
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

   newTask.onclick = () => {
      alert(newTask.textContent);
   };

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
      const index = Array.from(taskContainer.parentNode.children).indexOf(
         taskContainer
      );
      tasks.remove(index);
      renderTasks();
      pendingTasksUpdate("-");
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

function pendingTasksUpdate(action) {
   switch (action) {
      case "+":
         pendingTasks++;
         break;
      case "-":
         pendingTasks--;
         break;
      case 0:
         pendingTasks = 0;
         break;
   }

   pendingTasksCounter.textContent = pendingTasks;
   if (pendingTasks === 1) {
      sortButtonsContainer.classList.add(VISIBLE_CLASS);
   } else if (pendingTasks === 0) {
      sortButtonsContainer.classList.remove(VISIBLE_CLASS);
   }
}

function createTaskAnimation(newTask) {
   const taskAnimation = [
      { transform: "scale(0)" },
      { transform: "scale(1.1)" },
      { transform: "scale(1)" },
   ];

   newTask.animate(taskAnimation, 600);
}
