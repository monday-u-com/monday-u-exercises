

const taskInput = document.querySelector(".task-input");
const addTaskButton = document.querySelector(".task-add-btn");
const taskList = document.querySelector(".tasks-list");

addTaskButton.addEventListener("click", addTask);

function addTask(e) {
  const isAlertOn = isAlertShown();
  if (taskInput.value === "") {
    if (!isAlertOn) {
      toggleAlert();
    }
    return;
  }

  if (isAlertOn) {
    toggleAlert();
  }
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const newTask = document.createElement("li");
  newTask.classList.add("task-item");
  newTask.innerText = taskInput.value;
  taskDiv.appendChild(newTask);

  const completeTaskButton = document.createElement("button");
  completeTaskButton.classList.add("task-complete-btn");
  completeTaskButton.innerHTML = '<i class="fas fa-check"></i>';
  taskDiv.appendChild(completeTaskButton);

  const removeTaskButton = document.createElement("button");
  removeTaskButton.classList.add("task-remove-btn");
  removeTaskButton.innerHTML = '<i class="fas fa-trash"></i>';
  taskDiv.appendChild(removeTaskButton);

  taskList.appendChild(taskDiv);
  taskInput.value = "";
}
