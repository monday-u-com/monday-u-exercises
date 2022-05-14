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
  //create new <div> element
  const divElm = document.createElement("div");
  //create new <li> element
  const liElm = document.createElement("li");
  //create new <button> element
  const deleteButton = document.createElement("button");

  // style all elements
  divElm.classList.add("task");
  liElm.classList.add("task-item");
  deleteButton.classList.add("delete-button");

  //add textNode to <li> and <button>
  const text = document.querySelector(".task-input").value;
  liElm.appendChild(document.createTextNode(text));
  deleteButton.appendChild(document.createTextNode("X"));

  //add id to each element
  divElm.setAttribute("id", `${text}-div`);
  deleteButton.setAttribute("id", `${text}-button`);

  //append <li> and <button> to <div>
  divElm.appendChild(liElm);
  divElm.appendChild(deleteButton);
  deleteButton.addEventListener("click", deleteTask);

  //append <div>t to <ul>
  const taskList = document.querySelector(".task-list");
  taskList.appendChild(divElm);

  //clear input
  document.querySelector(".task-input").value = "";
}

function deleteTask({ target }) {
  const divElementId = target.id.split("-")[0].concat("-div");

  document.querySelector(`#${divElementId}`).remove();
}
