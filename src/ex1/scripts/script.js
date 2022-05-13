const taskInput = document.querySelector(".task-input");
const addTaskButton = document.querySelector(".task-add-btn");
const taskList = document.querySelector(".tasks-list");
const emptyAlert = document.querySelector(".alert");
const alertClose = document.querySelector(".alert-close-btn");

addTaskButton.addEventListener("click", addTask);
alertClose.addEventListener("click", toggleAlert);

function toggleAlert() {
  if (emptyAlert.classList.contains("show")) {
    emptyAlert.classList.remove("show");
    emptyAlert.classList.add("hide");
  } else {
    emptyAlert.classList.add("show");
    emptyAlert.classList.remove("hide");
  }
}

function addTask(e) {
  const isAlertOff = emptyAlert.classList.contains("hide");
  if (taskInput.value === "") {
    if (isAlertOff) {
      toggleAlert();
    }
    return;
  }

  if (!isAlertOff) {
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
