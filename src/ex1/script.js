// Add task
const addTaskBtn = document.querySelector(".add-task-btn");
addTaskBtn.addEventListener("click", (event) => onAddTask(event));

const onAddTask = (event) => {
  console.log("add task");
};

// Clear all
const clearAllBtn = document.querySelector(".clear-all");
clearAllBtn.addEventListener("click", (event) => onClearAll(event));

const onClearAll = (event) => {
  console.log("clear all");
};
