const taskInput = document.querySelector(" #taskInput ");
const addBtn = document.querySelector(" #addBtn ");
const clearAllBtn = document.querySelector(" #clearAllBtn ");
const sortAllBtn = document.querySelector(" #sortAllBtn ");
const taskList = document.querySelector(" #taskList ");
const placeHolder = document.querySelector(" .placeHolder ")

const taskArr = JSON.parse(localStorage.getItem("tasks")) || [];

//function to add task and update the list and the localStorage
addTask = () => {
    taskArr.push(taskInput.value); //add the user value to the task array 
    updateTasks();
    taskInput.value = ''; //clear the input after added
    addBtn.disabled = true;
}

//waiting for user input before enable the add button
taskInput.addEventListener('keyup', () => {
    addBtn.disabled = !taskInput.value;
})
// add a task when user press Enter key
taskInput.addEventListener("keypress", (e) => { if (e.key === 'Enter') addTask() });

//add click event listener to add button
addBtn.addEventListener("click", addTask);

//sort the tasks list add them to html list element and save them to the LocalStorage
sortAllBtn.addEventListener("click", () => {
    taskArr.sort();
    updateTasks();
})

//sort the tasks list add them to html list element and save them to the LocalStorage
clearAllBtn.addEventListener("click", () => {
    taskArr.length = 0;
    updateTasks();
})

//function to insert the tasks to the html list element
insertTasks = () => {
    let liToAdd = '';
    taskArr.forEach((task, index) => {
        liToAdd += `<li onclick="alert('${task}')">${task}<span onclick="removeTask(${index})"><i class="fa fa-trash-o"></i></span></li>`;
    });
    taskList.innerHTML = liToAdd;
    clearAllBtn.disabled = false;
    sortAllBtn.disabled = false;
    placeHolder.classList.add("hidden");
}

// function to remove task that have been clicked
removeTask = (index) => {
    taskArr.splice(index, 1)
    updateTasks();
}

//update list and localStorage
updateTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(taskArr)); //add the task array to the localStorage
    insertTasks();
    if (taskArr.length === 0) { //if there are no task any more disable the clear and sort button
        clearAllBtn.disabled = true;
        sortAllBtn.disabled = true;
        placeHolder.classList.remove("hidden");
    }
    else {
        placeHolder.classList.add("hidden");
    }
}

//if there are some task in the localStorage insert them
init = () => {
    updateTasks();
}