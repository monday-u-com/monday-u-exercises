const addButton = document.querySelector("#add-task-button");
const triangle = document.querySelector("#triangle");
const box = document.querySelector("#box");
const welcome = document.querySelector("#welcome-sentence");
const addTaskButton = document.querySelector(".task-button");
const addTaskInput = document.querySelector(".task-input");
const listOfTasks = [];

addTaskButton.addEventListener("click", addTask);
addTaskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const text = document.querySelector(".task-input").value;

  if (text === "") {
    alert("Input cannot be empty");
  } else {
    if (listOfTasks.length === 0) {
      hideWelcomePart();
    }
    listOfTasks.push(text);
    createTask(text);
  }
}

function hideWelcomePart() {
  addButton.classList.remove("hithere");
  triangle.classList.add("hidden");
  box.classList.add("hidden");
  welcome.classList.add("hidden");
}

function showWelcomePart() {
  addButton.classList.add("hithere");
  triangle.classList.remove("hidden");
  box.classList.remove("hidden");
  welcome.classList.remove("hidden");
}

function createTask(text) {
  //create elements
  const divElm = document.createElement("div");
  const liElm = document.createElement("li");
  const deleteButton = document.createElement("button");

  // style  elements
  divElm.classList.add("task");
  liElm.classList.add("task-item");
  deleteButton.classList.add("delete-button");

  //add textNodes
  liElm.appendChild(document.createTextNode(text));
  deleteButton.appendChild(document.createTextNode("X"));

  //add ids
  const idText = text.split(" ").join("-");
  divElm.setAttribute("id", `${idText}`);
  deleteButton.setAttribute("id", `${idText}-button`);

  //append <li> and <button> to <div>
  divElm.appendChild(liElm);
  divElm.appendChild(deleteButton);

  //append <div> to <ul>
  const taskList = document.querySelector(".task-list");
  taskList.appendChild(divElm);

  //add clickListener to button
  deleteButton.addEventListener("click", deleteTask);
  liElm.addEventListener("click", () => alert(`Task: ${text}`));

  //clear input
  document.querySelector(".task-input").value = "";
}

function deleteTask({ target }) {
  const buttonId = target.id.split("-");
  buttonId.pop();

  //remove <div> with task
  const divElementId = buttonId.join("-");
  document.querySelector(`#${divElementId}`).remove();

  // remove task from list
  const taskText = buttonId.join(" ");
  const elementIndex = listOfTasks.findIndex((task) => {
    return task === taskText;
  });
  listOfTasks.splice(elementIndex, 1);

  //show weolcome if list is empty
  if (listOfTasks.length === 0) {
    showWelcomePart();
  }
}
