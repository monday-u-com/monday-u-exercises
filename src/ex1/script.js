function addTask() {

    if (!document.getElementById("new-task-input").value.length) {
        alert("Please input a value")
        return
    }

    const newTaskText = document.getElementById("new-task-input").value
    const newTaskDiv = document.createElement("div"); //Task
    const newTaskDivContainer = document.createElement("div"); //Task Container
    const newTextDiv = document.createTextNode(newTaskText); //Text
    const deleteButton = document.createElement("button"); //Button
    deleteButton.classList.add("delete-button")
    deleteButton.addEventListener("click", () => {
        newTaskDivContainer.remove()
    })
    newTaskDiv.appendChild(newTextDiv);
    newTaskDiv.addEventListener("click", () => alert(newTaskDiv.innerHTML))
    newTaskDiv.classList.add("task")
    newTaskDivContainer.classList.add("new-task-div-container")
    newTaskDivContainer.appendChild(newTaskDiv)
    newTaskDivContainer.appendChild(deleteButton)
    document.getElementById("task-container").appendChild(newTaskDivContainer)

    document.getElementById("new-task-input").value = ""
}