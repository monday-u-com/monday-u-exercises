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
taskInput.addEventListener("keypress", (e) => { if (e.key === 'Enter') addNewTask() });

//add click event listener to add button
addBtn.addEventListener("click", addNewTask);

//sort the tasks list add them to html list element and save them to the LocalStorage
sortAllBtn.addEventListener("click", () => {
    taskArr.sort();
    insertAllTasks();
    localStorage.setItem("tasks", JSON.stringify(taskArr)); //add the updated task array to the localStorage
})

//sort the tasks list add them to html list element and save them to the LocalStorage
clearAllBtn.addEventListener("click", () => {
    taskArr.length = 0;
    taskList.innerHTML = '';
    localStorage.setItem("tasks", JSON.stringify(taskArr)); //add the updated task array to the localStorage
    updateForm();
})

//function to add task and update the list and the localStorage
function addNewTask() {
    taskArr.push(taskInput.value); //add the user value to the task array
    const lastIndex = taskArr.length - 1;
    taskList.innerHTML += `<li onclick="alert('${taskArr[lastIndex]}')">${taskArr[lastIndex]}<span onclick="removeTask(${lastIndex})"><i class="fa fa-trash-o"></i></span></li>`;
    taskInput.value = ''; //clear the input after added
    addBtn.disabled = true;
    localStorage.setItem("tasks", JSON.stringify(taskArr)); //add the updated task array to the localStorage
    updateForm();
}

// function to remove task that have been clicked
function removeTask(index) {
    taskArr.splice(index, 1);
    taskList.removeChild(taskList.children[index]);
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

//function to insert the all tasks to the html list element
function insertAllTasks() {
    let liToAdd = '';
    taskArr.forEach((task, index) => {
        liToAdd += `<li onclick="alert('${task}')">${task}<span onclick="removeTask(${index})"><i class="fa fa-trash-o"></i></span></li>`;
    });
    taskList.innerHTML = liToAdd;
    updateForm();
}

//if there are some task in the localStorage insert them
function init() {
    if (taskArr.length != 0) insertAllTasks();
    else placeHolder.classList.remove("hidden");
}