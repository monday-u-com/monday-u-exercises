/*
function saveTaskToLocalStorage(task, isCompleted) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push([task, isCompleted]);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
}

function renderTasksFromLocalStorage() {
  tasksList.innerHTML = "";
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(function (task) {
    const taskDiv = createTaskDiv(task[0], task[1]);
    tasksList.appendChild(taskDiv);
    addTaskDivEventListeners(taskDiv);
    toggleEmptyMsg();
  });
}
renderTasksFromLocalStorage();



function removeTaskFromLocalStorage(taskContent) {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach(function (task, index) {
    if (task[0] === taskContent) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskInLocalStorage(taskContent) {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach(function (task, index) {
    if (task[0] === taskContent) {
      tasks[index][1] = !tasks[index][1];
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTasksOrderInLocalStorage() {
  const tasks = tasksList.children;
  const tasksArray = [];
  for (let i = 0; i < tasks.length; i++) {
    tasksArray.push([
      tasks[i].innerText,
      tasks[i].classList.contains("task-completed"),
    ]);
  }
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
*/