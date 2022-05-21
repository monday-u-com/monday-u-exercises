const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskInput = document.querySelector(".add-task-input");
const clearAllBtn = document.querySelector(".clear-all");
const main = new Main(addTaskBtn, addTaskInput, clearAllBtn);

document.addEventListener("DOMContentLoaded", function () {
  // the method should add the event listener to your "add" button
  main.init();
});
