const addTaskButton = document.querySelector(".task-button");
const addTaskInput = document.querySelector(".task-input");

addTaskButton.addEventListener("click", addTask);
addTaskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  //create new <div> element
  const newDiv = document.createElement("div");
  //create new <li> element
  const newListItem = document.createElement("li");
  //create new <button> element
  const deleteButton = document.createElement("button");

  // style all elements
  newDiv.classList.add("task");
  newListItem.classList.add("task-item");
  deleteButton.classList.add("delete-button");

  //add textNode to <li> and <button>
  const text = document.querySelector(".task-input").value;
  newListItem.appendChild(document.createTextNode(text));
  deleteButton.appendChild(document.createTextNode("X"));

  //append <li> and <button> to <div>
  newDiv.appendChild(newListItem);
  newDiv.appendChild(deleteButton);

  //append <div>t to <ul>
  const taskList = document.querySelector(".task-list");
  taskList.appendChild(newDiv);

  //clear input
  document.querySelector(".task-input").value = "";
}
