const addTaskButton = document.querySelector(".task-button");
const addTaskInput = document.querySelector(".task-input");

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
    createTask();
  }
}

function createTask() {
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
  const divElementId = buttonId.join("-");

  document.querySelector(`#${divElementId}`).remove();
}
