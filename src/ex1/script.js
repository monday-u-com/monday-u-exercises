const addButton = document.querySelector('.add-task');
const taskInput = document.querySelector('#task-text');
const tasksContainer = document.querySelector('.tasks-container');

addButton.addEventListener('click', () => {
    addTask();
})

function addTask() {
    const newTask = document.createElement("div");
    newTask.textContent = taskInput.value;
    newTask.classList.add('task');
    tasksContainer.append(newTask);
    newTask.addEventListener('click', () => {
        alert(newTask.textContent);
    })
}

