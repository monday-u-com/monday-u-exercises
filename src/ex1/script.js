const addTaskButton = document.querySelector(".task-button");
const addTaskInput = document.querySelector(".task-input");

addTaskButton.addEventListener("click", addTask);
addTaskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  //create new <li> element
  const newListItem = document.createElement("li");

  // style this element
  newListItem.classList.add("task-item");

  //add textNode to this element
  const text = document.querySelector(".task-input").value;
  newListItem.appendChild(document.createTextNode(text));

  //append this element to <ul>
  const taskList = document.querySelector(".task-list");
  taskList.appendChild(newListItem);

  //clear input
  document.querySelector(".task-input").value = "";
}
