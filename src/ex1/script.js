const addTaskButton = document.querySelector(".add-task");
const taskInput = document.querySelector("#task-text");
const allTasksContainer = document.querySelector(".all-tasks-container");
const pendingTasksCounter = document.querySelector("#tasks-counter");
let pendingTasks = 0;
const clearButton = document.querySelector(".clear-all");
const sortButton = document.querySelector(".name-sort");

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
      .querySelectorAll(".task-container")
      .forEach((task) => task.remove());
   pendingTasksUpdate(0);
};

sortButton.onclick = () => {
   const taskContainers = [...document.querySelectorAll(".task-container")];
   taskContainers.sort((a, b) =>
      a.children[0].innerText.localeCompare(b.children[0].innerText)
   );
   taskContainers.map((container) => container.remove());
   taskContainers.map((container) => allTasksContainer.appendChild(container));
};

function addTask() {
   if (taskInput.value.trim().length === 0) {
      alert("Please fill in a task");
      taskInput.value = "";
   } else {
      const taskContainer = createTaskContainer();
      const newTask = createNewTask(taskContainer);
      const deleteTask = createDeleteTaskButton(taskContainer);
      addHoverReveal(taskContainer, deleteTask, newTask);
      createTaskAnimation(newTask);
      taskInput.value = "";
      pendingTasksUpdate("+");
   }
}

function createTaskContainer() {
   const taskContainer = document.createElement("div");
   taskContainer.classList.add("task-container");
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
   deleteTask.classList.add("delete");
   taskContainer.append(deleteTask);

   deleteTask.addEventListener("click", () => {
      taskContainer.remove();
      pendingTasksUpdate("-");
   });

   return deleteTask;
}

function addHoverReveal(taskContainer, deleteTask, newTask) {
   taskContainer.addEventListener("mouseover", () => {
      deleteTask.style.visibility = "visible";
   });

   taskContainer.addEventListener("mouseout", () => {
      deleteTask.style.visibility = "hidden";
   });
}

function pendingTasksUpdate(action) {
   if (action === "+") {
      pendingTasks++;
   } else if (action === "-") {
      pendingTasks--;
   } else {
      pendingTasks = 0;
   }
   pendingTasksCounter.textContent = pendingTasks;
}

function createTaskAnimation(newTask) {
   const taskAnimation = [
      { transform: "scale(0)" },
      { transform: "scale(1.1)" },
      { transform: "scale(1)" },
   ];

   newTask.animate(taskAnimation, 600);
}
