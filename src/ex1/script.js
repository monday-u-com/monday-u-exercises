const addButton = document.querySelector('.add-task');
const taskInput = document.querySelector('#task-text');
const allTasksContainer = document.querySelector('.all-tasks-container');

addButton.addEventListener('click', () => {
    addTask();
})

function addTask() {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add('task-container');
    allTasksContainer.append(taskContainer);

    const newTask = document.createElement("div");
    newTask.textContent = taskInput.value;
    newTask.classList.add('task');
    taskContainer.append(newTask);
    newTask.addEventListener('click', () => {
        alert(newTask.textContent);
    })

    const deleteTask = document.createElement("div");
    deleteTask.textContent = 'D';
    deleteTask.classList.add('delete');
    deleteTask.addEventListener('click', () => {
        taskContainer.remove();
    })
    taskContainer.append(deleteTask);

    taskContainer.addEventListener('mouseover', () => {
        deleteTask.style.display = 'flex';
        newTask.style.width = '26rem';
    })

    taskContainer.addEventListener('mouseout', () => {
        deleteTask.style.display = 'none';
        newTask.style.width = '29.5rem';
    })

}

