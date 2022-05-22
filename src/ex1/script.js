function addTask() {

    document.getElementById("task-container").classList.remove("empty-list")

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
        if (!document.getElementById("task-container").children.length) {
            document.getElementById("task-container").classList.add("empty-list")
        }
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

function sort() {
    const nodes = document.getElementById("task-container").children
    var elements = [].slice.call(nodes);
    elements.sort(function (a, b) {
        return a.textContent.localeCompare(b.textContent);
    }).forEach(function (val, index) {
        document.getElementById("task-container").appendChild(val);
    });
}


document.addEventListener('keydown', function (key) {
    if (key.code === "Enter") {
        addTask()
    }
})

function clearAll() {
    const tasks = document.getElementById("task-container")
    while (tasks.children.length) {
        tasks.children[0].remove()
    }
    tasks.classList.add("empty-list")
}