const addTaskButton = document.querySelector(".add-task");
const taskInput = document.querySelector("#task-text");
const allTasksContainer = document.querySelector(".all-tasks-container");
const pendingTasksText = document.querySelector(".pending-tasks");
let pendingTasks = 0;
const clearButton = document.querySelector(".clear-all");

// Event trigger when user clicks the add task button
addTaskButton.addEventListener("click", () => {
   addTask();
});

// Same as the button add task but only when user press "Enter"
taskInput.addEventListener("keypress", (e) => {
   if (e.key === "Enter") {
      addTask();
   }
});

// Clears all tasks when clear all button is clicked
clearButton.onclick = () => {
   document
      .querySelectorAll(".task-container")
      .forEach((task) => task.remove());
   pendingTasksUpdate(0);
};

// Adds the user task input to the tasks list
function addTask() {
   // Checks for blank spaces
   if (taskInput.value.trim().length === 0) {
      alert("Please fill in a task");
      taskInput.value = "";
   } else {
      const taskContainer = createTaskContainer();
      const newTask = createNewTask(taskContainer);
      const deleteTask = createDeleteTaskButton(taskContainer);
      addHoverReveal(taskContainer, deleteTask, newTask);
      taskInput.value = "";
      pendingTasksUpdate("+");
   }
}

// Creates container which holds task box and delete button
function createTaskContainer() {
   const taskContainer = document.createElement("div");
   taskContainer.classList.add("task-container");
   allTasksContainer.append(taskContainer);

   return taskContainer;
}

// Creates task box and click alert event to it
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

// Creates the delete button next to each task
function createDeleteTaskButton(taskContainer) {
   const deleteTask = document.createElement("div");
   deleteTask.textContent = "D";
   deleteTask.classList.add("delete");
   taskContainer.append(deleteTask);

   deleteTask.addEventListener("click", () => {
      taskContainer.remove();
      pendingTasksUpdate("-");
   });

   return deleteTask;
}

// Adds mouseover events to reveal the delete button only when user hovers
function addHoverReveal(taskContainer, deleteTask, newTask) {
   taskContainer.addEventListener("mouseover", () => {
      deleteTask.style.display = "flex";
      newTask.style.width = "26rem";
   });

   taskContainer.addEventListener("mouseout", () => {
      deleteTask.style.display = "none";
      newTask.style.width = "29.5rem";
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
   pendingTasksText.textContent = `You have ${pendingTasks} pending tasks`;
}
