const addButton = document.querySelector('.add-task');
const taskInput = document.querySelector('#task-text');
const card = document.querySelector('.card');

addButton.addEventListener('click', e=> {
    addTask();
})

function addTask() {
    const newTask = document.createElement("div");
    newTask.textContent = taskInput.value;
    newTask.classList.add('task');
    card.append(newTask);
}

