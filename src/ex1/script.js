const addButton = document.querySelector('.add-task');
const taskInput = document.querySelector('#task-text');
const card = document.querySelector('.card');

addButton.addEventListener('click', () => {
    addTask();
})

function addTask() {
    const newTask = document.createElement("div");
    newTask.textContent = taskInput.value;
    newTask.classList.add('task');
    card.append(newTask);
    newTask.addEventListener('click', () => {
        alert(newTask.textContent);
    })
}

