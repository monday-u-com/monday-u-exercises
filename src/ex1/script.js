function addTask() {
    const newTaskText = document.getElementById("new-task-input").value
    const newTaskDiv = document.createElement("div");
    const newTextDiv = document.createTextNode(newTaskText);
    newTaskDiv.appendChild(newTextDiv);
    newTaskDiv.classList.add("task")
    document.getElementById("task-container").appendChild(newTaskDiv)
}