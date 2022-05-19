const inputBox = document.querySelector(".add-new-input");
const addTaskBtn = document.querySelector(".add-new-button");
const todoList = document.querySelector(".todo-list");
const pendingTasks = document.querySelector(".pending-tasks");

//Get the todo list from local storage.
let userTasks = loadTasksFromLocalStorage();

//This function returns the array that is in the local storage.
//If there is nothing in it it returns an empty array.
function loadTasksFromLocalStorage() {
  return Array.from(JSON.parse(localStorage.getItem("tasks")) || []);
}

//This function returns a string of the current time and date.
// For each task I save a field of when it was added.
function getNowTime() {
  var today = new Date();
  var nowtime =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();
  return nowtime;
}

inputBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTaskBtn.click();
  }
});

//This function adds a task to the list When addTaskBtn clicked.
addTaskBtn.onclick = () => {
  let userValue = inputBox.value;

  //Input vlidation check.
  if (userValue === "") {
    alert("Please enter a valid input");
  } else {
    userTasks.push({
      task: userValue,
      date: getNowTime(),
    });

    inputBox.value = "";
    todoList.innerHTML = "";

    //Update of the list stored in local storage to the new list (after we added a new task)
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("tasks") || "[]"),
        { task: userValue, date: getNowTime() }, // completed: false },
      ])
    );

    showTasks();
  }
};

function deleteTask() {
  userTasks.splice(this.parentElement.id, 1);
  localStorage.setItem("tasks", JSON.stringify(userTasks));
  todoList.innerHTML = "";
  showTasks();
}

function taskClicked() {
  alert(`you clicked on ${userTasks[this.id].task}`);
}

function showTasks() {
  userTasks.forEach((value, index) => {
    //Create all the html elements to be added to the list
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    const task = document.createElement("Text");
    const deleteBtn = document.createElement("button");
    const deleteIcon = document.createElement("ion-icon");

    //Define a class for the elements we have created to get the required design
    listItem.classList.add("todo-list-item");
    deleteBtn.classList.add("delete-task-btn");

    //Setting the id to be the index in the array.
    //In this way the delete function will have access to the index.
    task.id = index;
    task.innerText = value.task;
    deleteIcon.name = "trash-outline";

    deleteBtn.onclick = deleteTask;
    task.onclick = taskClicked;

    //Building the elements tree hierarchically
    deleteBtn.appendChild(deleteIcon);
    span.appendChild(task);
    span.appendChild(deleteBtn);
    listItem.appendChild(span);
    todoList.appendChild(listItem);
  });

  pendingTasks.innerText =
    userTasks.length == 0
      ? `You don't have pending tasks`
      : `You have a ${userTasks.length} pending tasks`;
}

showTasks();
