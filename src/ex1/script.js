const addTaskButton = document.querySelector(".task-button");
const addTaskInput = document.querySelector(".task-input");
const deleteButtons = document.querySelectorAll(".delete-button");

addTaskButton.addEventListener("click", addTask);
addTaskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  //create elements
  const divElm = document.createElement("div");
  const liElm = document.createElement("li");
  const deleteButton = document.createElement("button");

  // style  elements
  divElm.classList.add("task");
  liElm.classList.add("task-item");
  deleteButton.classList.add("delete-button");

  //add textNodes
  const text = document.querySelector(".task-input").value;
  liElm.appendChild(document.createTextNode(text));
  deleteButton.appendChild(document.createTextNode("X"));

  //add ids
  divElm.setAttribute("id", `${text}-div`);
  deleteButton.setAttribute("id", `${text}-button`);

  //append <li> and <button> to <div>
  divElm.appendChild(liElm);
  divElm.appendChild(deleteButton);

  //append <div> to <ul>
  const taskList = document.querySelector(".task-list");
  taskList.appendChild(divElm);

  //add clickListener to button
  deleteButton.addEventListener("click", deleteTask);

  //clear input
  document.querySelector(".task-input").value = "";
}

function deleteTask({ target }) {
  const divElementId = target.id.split("-")[0].concat("-div");

  document.querySelector(`#${divElementId}`).remove();
}
