const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskInput = document.querySelector(".add-task-input");
const main = new Main(addTaskBtn, addTaskInput);

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
