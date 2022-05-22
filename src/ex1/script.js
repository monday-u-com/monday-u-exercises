const addTaskButton = document.querySelector(ADD_TASK_BTN_SELECTOR);
const taskInput = document.querySelector(TASK_INPUT_SELECTOR);
const allTasksContainer = document.querySelector(ALL_TASKS_CONTAINER_SELECTOR);
const pendingTasksCounter = document.querySelector(TASKS_COUNTER_SELECTOR);
let pendingTasks = 0;
const clearButton = document.querySelector(CLEAR_BTN_SELECTOR);
const sortDownButton = document.querySelector(SORT_DOWN_BTN_SELECTOR);
const sortUpButton = document.querySelector(SORT_UP_BTN_SELECTOR);
const sortButtonsContainer = document.querySelector(SORT_BTNS_SELECTOR);

addTaskButton.addEventListener("click", () => {
   addTask();
});

taskInput.addEventListener("keypress", (e) => {
   if (e.key === "Enter") {
      addTask();
   }
});

clearButton.onclick = () => {
   document
      .querySelectorAll(TASKS_CONTAINER_SELECTOR)
      .forEach((task) => task.remove());
   pendingTasksUpdate(0);
};

sortDownButton.onclick = () => {
   sortTasks("down");
};

sortUpButton.onclick = () => {
   sortTasks("up");
};

function sortTasks(direction) {
   const taskContainers = [
      ...document.querySelectorAll(TASKS_CONTAINER_SELECTOR),
   ];
   if (direction === "up") {
      taskContainers.sort((a, b) =>
         b.children[0].innerText.localeCompare(a.children[0].innerText)
      );
   } else if (direction === "down") {
      taskContainers.sort((a, b) =>
         a.children[0].innerText.localeCompare(b.children[0].innerText)
      );
   }
   taskContainers.forEach((container) => container.remove());
   taskContainers.forEach((container) =>
      allTasksContainer.appendChild(container)
   );
}

function addTask() {
   if (taskInput.value.trim().length === 0) {
      alert("Please fill in a task");
      taskInput.value = "";
   } else {
      createTaskProcedure();
      taskInput.value = "";
      pendingTasksUpdate("+");
   }
}

function createTaskProcedure() {
   const taskContainer = createTaskContainer();
   const newTask = createNewTask(taskContainer);
   const deleteTask = createDeleteTaskButton(taskContainer);
   addHoverReveal(taskContainer, deleteTask, newTask);
   createTaskAnimation(newTask);
}

function createTaskContainer() {
   const taskContainer = document.createElement("div");
   taskContainer.classList.add(TASKS_CONTAINER_SELECTOR.slice(1));
   allTasksContainer.append(taskContainer);

   return taskContainer;
}

function createNewTask(taskContainer) {
   const newTask = document.createElement("div");
   newTask.textContent = taskInput.value;
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
      taskContainer.remove();
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
