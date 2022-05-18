const taskInput = document.querySelector(" #taskInput ");
const addBtn = document.querySelector(" #addBtn ");
const clearAllBtn = document.querySelector(" #clearAllBtn ");
const sortAllBtn = document.querySelector(" #sortAllBtn ");
const taskList = document.querySelector(" #taskList ");
const placeHolder = document.querySelector(" .placeHolder ")
const pedingTaskText = document.querySelector(" #peding-task-text ")

const taskArr = JSON.parse(localStorage.getItem("tasks")) || [];


//waiting for user input before enable the add button
taskInput.addEventListener('keyup', () => addBtn.disabled = !taskInput.value)

// add a task when user press Enter key
taskInput.addEventListener("keypress", (e) => { if (e.key === 'Enter') addNewTask(taskInput.value) });

//add click event listener to add button
addBtn.addEventListener("click", () => addNewTask(taskInput.value));

//sort the tasks list add them to html list element and save them to the LocalStorage
sortAllBtn.addEventListener("click", () => {
    taskArr.sort();
    taskList.innerHTML = '';
    insertAllTasks();
    localStorage.setItem("tasks", JSON.stringify(taskArr)); //add the updated task array to the localStorage
})

//sort the tasks list add them to html list element and save them to the LocalStorage
clearAllBtn.addEventListener("click", () => {
    taskArr.length = 0;
    taskList.innerHTML = ''; //Clear the list of tasks element
    localStorage.setItem("tasks", JSON.stringify(taskArr)); //add the updated task array to the localStorage
    updateForm();
})

//function to add task and update the list and the localStorage
function addNewTask(taskValue) {
    taskArr.push(taskValue); //add the user value to the task array
    taskList.appendChild(createLi(taskValue));
    taskInput.value = ''; //clear the input after added
    addBtn.disabled = true;
    localStorage.setItem("tasks", JSON.stringify(taskArr)); //add the updated task array to the localStorage
    updateForm();
}

// function to remove task that have been clicked
function removeTask(li, taskValue) {
    taskArr.splice(taskArr.indexOf(taskValue), 1);
    taskList.removeChild(li);
    localStorage.setItem("tasks", JSON.stringify(taskArr)); //add the updated task array to the localStorage
    updateForm();
}

//update the button and the placeHolder if necessary
function updateForm() {
    pedingTaskText.innerHTML = "You have " + taskArr.length + " pending tasks"
    if (taskArr.length === 0) { //if there are no task any more disable the clear and sort button
        clearAllBtn.disabled = true;
        sortAllBtn.disabled = true;
        placeHolder.classList.remove("hidden");
    }
    else {
        clearAllBtn.disabled = false;
        sortAllBtn.disabled = false;
        placeHolder.classList.add("hidden");
    }
}

//function to insert the all tasks from the localStorage to the html list element
function insertAllTasks() {
    taskArr.forEach((taskValue) => {
        taskList.appendChild(createLi(taskValue));
    });
    updateForm();
}

//Function to create the li element and its childs and assign a click event to them
function createLi(taskValue) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const i = document.createElement("i");
    li.innerHTML = taskValue;
    i.classList.add("fa", "fa-trash-o");
    span.appendChild(i);
    li.appendChild(span);
    span.onclick = (e) => {
        e.stopPropagation();
        removeTask(li, taskValue);
    };
    li.onclick = () => alert(taskValue);
    return li;
}

//if there are some task in the localStorage insert them
function init() {
    if (taskArr.length != 0) insertAllTasks();
    else placeHolder.classList.remove("hidden");
}