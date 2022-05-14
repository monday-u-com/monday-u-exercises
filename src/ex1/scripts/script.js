const taskInput = document.querySelector(".task-input");
const addTaskButton = document.querySelector(".task-add-btn");
const taskList = document.querySelector(".tasks-list");

addTaskButton.addEventListener("click", onAddTaskClick);
taskList.addEventListener("click", onTaskButtonsClick);

function handleAlert() {
  const isAlertOn = isAlertShown();
  if (taskInput.value === "") {
    if (!isAlertOn) {
      toggleAlert();
    }
    return true;
  } else return false;
}

function onAddTaskClick(e) {
  if (handleAlert()) {
    return;
  }

  const isAlertOn = isAlertShown();
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

function onTaskButtonsClick(e) {
  const button = e.target;
  if (button.classList.contains("task-complete-btn")) {
    button.parentElement.classList.toggle("task-completed");
    button.classList.toggle("btn-completed");
  } else if (e.target.classList.contains("task-remove-btn")) {
    const task = e.target.parentElement;
    task.addEventListener("transitionend", onRemoveTransitionEnd, false);
    task.classList.add("task-removed");
    function onRemoveTransitionEnd() {
      task.remove();
      task.removeEventListener("transitionend", onRemoveTransitionEnd, false);
    }
  }
}
