const taskInput = document.querySelector(".task-input");
const addTaskButton = document.querySelector(".task-add-btn");
const tasksList = document.querySelector(".tasks-list");
const filterOptiopn = document.querySelector(".filter-tasks");
const searchInput = document.querySelector(".search-input");

addTaskButton.addEventListener("click", onAddTaskClick);
tasksList.addEventListener("click", onTaskButtonsClick);
filterOptiopn.addEventListener("click", onFilterOptionChange);
searchInput.addEventListener("keyup", onSearchInputKeyUp);

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

  const gripLines = document.createElement("div");
  gripLines.classList.add("grip-lines-icon");
  gripLines.innerHTML = '<i class="fas fa-grip-lines"></i>';
  gripLines.addEventListener("click", onTaskGripClick);
  taskDiv.appendChild(gripLines);

  const newTask = document.createElement("p");

  newTask.classList.add("task-item");
  newTask.innerText = taskInput.value;
  taskDiv.appendChild(newTask);
  taskDiv.addEventListener("click", onTaskClick);

  const completeTaskButton = document.createElement("button");
  completeTaskButton.classList.add("task-complete-btn");
  completeTaskButton.classList.add("hide");
  completeTaskButton.innerHTML = '<i class="fas fa-check"></i>';
  taskDiv.appendChild(completeTaskButton);

  const removeTaskButton = document.createElement("button");
  removeTaskButton.classList.add("task-remove-btn");
  removeTaskButton.classList.add("hide");
  removeTaskButton.innerHTML = '<i class="fas fa-trash"></i>';
  taskDiv.appendChild(removeTaskButton);
  taskDiv.addEventListener("mouseover", onTaskMouseOver);
  taskDiv.addEventListener("mouseleave", onTaskMouseOut);
  taskDiv.draggable = true;
  tasksList.appendChild(taskDiv);
  toggleEmptyMsg();
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
      toggleEmptyMsg();
      task.removeEventListener("transitionend", onRemoveTransitionEnd, false);
    }
  }
}

function onFilterOptionChange(e) {
  const tasks = tasksList.children;
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    console.log("Debug: ", task.classList);
    const isCompleted = task.classList.contains("task-completed");
    if (e.target.value === "all") {
      task.style.display = "flex";
    } else if (e.target.value === "completed" && isCompleted) {
      task.style.display = "flex";
    } else if (e.target.value === "uncompleted" && !isCompleted) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  }
}

function toggleEmptyMsg() {
  const emptyMsg = document.querySelector(".empty-msg");
  if (tasksList.children.length === 0) {
    emptyMsg.classList.remove("hide");
  } else {
    emptyMsg.classList.add("hide");
  }
}

function onSearchInputKeyUp(e) {
  const tasks = tasksList.children;
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  }
}

function onTaskClick(e) {
  console.log("DEBUG", e.target);
  if (e.target.classList.contains("task")) {
    alert(e.target.innerText);
  }
}

function onTaskMouseOver(e) {
  const completeTaskButton = e.target.querySelector(".task-complete-btn");
  completeTaskButton.classList.remove("hide");
  const removeTaskButton = e.target.querySelector(".task-remove-btn");
  removeTaskButton.classList.remove("hide");
}

function onTaskMouseOut(e) {
  const completeTaskButton = e.target.querySelector(".task-complete-btn");
  completeTaskButton.classList.add("hide");
  const removeTaskButton = e.target.querySelector(".task-remove-btn");
  removeTaskButton.classList.add("hide");
}

function onTaskGripClick() {
  console.log("Test");
}

const dragArea = document.querySelector(".tasks-list");
new Sortable(dragArea, {
  animation: 350,
});
