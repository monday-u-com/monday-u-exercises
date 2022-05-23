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

addTaskButton.addEventListener("click", () => {
   if (addTask()) {
      const newTask = renderTasks();
      createTaskAnimation(newTask);
   }
});

taskInput.addEventListener("keypress", (e) => {
   if (e.key === "Enter") {
      if (addTask()) {
         const newTask = renderTasks();
         createTaskAnimation(newTask);
      }
   }
});

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

function addTask() {
   if (taskInput.value.trim().length === 0) {
      alert("Please fill in a task");
      taskInput.value = "";

      return false;
   } else {
      tasks.add(taskInput.value);
      taskInput.value = "";
      pendingTasksUpdate("+");

      return true;
   }
}

function createTaskContainer() {
   const taskContainer = document.createElement("div");
   taskContainer.classList.add(TASKS_CONTAINER_SELECTOR.slice(1));
   allTasksContainer.append(taskContainer);

   return taskContainer;
}

function createNewTask(taskContainer, item) {
   const newTask = document.createElement("div");
   newTask.textContent = item;
   newTask.classList.add("task");
   taskContainer.append(newTask);

   newTask.addEventListener("click", () => {
      alert(newTask.textContent);
   });

   return newTask;
}

function createDeleteTaskButton(taskContainer) {
   const deleteTask = document.createElement("div");
   const i = document.createElement("i");
   i.classList.add("fa-solid", "fa-trash");
   deleteTask.appendChild(i);
   deleteTask.classList.add(DEL_BTN_CLASS);
   taskContainer.append(deleteTask);

   deleteTask.addEventListener("click", () => {
      const index = Array.from(taskContainer.parentNode.children).indexOf(
         taskContainer
      );
      tasks.remove(index);
      renderTasks();
      pendingTasksUpdate("-");
   });

   return deleteTask;
}

function addHoverReveal(taskContainer, deleteTask, newTask) {
   taskContainer.addEventListener("mouseover", () => {
      deleteTask.classList.add(VISIBLE_CLASS);
   });

   taskContainer.addEventListener("mouseout", () => {
      deleteTask.classList.remove(VISIBLE_CLASS);
   });
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
