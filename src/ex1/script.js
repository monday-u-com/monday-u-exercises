const addBtn = document.querySelectorAll('.add-task-btn');
const clearAllBtn = document.querySelectorAll('.clear-all');
const addTaskField = document.querySelectorAll('.add-task-field');


const taskList = [];
updateFooter();


addBtn[0].addEventListener('click', () => {
    addTaskFunc();
});

addTaskField[0].addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTaskFunc();
    }
});

clearAllBtn[0].addEventListener('click', () => {
    const tasks = document.querySelectorAll('.tasks');
    tasks[0].replaceChildren();
    while (taskList.length) taskList.pop();
    updateFooter();
});

function addTaskFunc() {
    const newTaskField = document.querySelectorAll('.add-task-field');
    const taskText = newTaskField[0].value;
    const tasksDiv = document.querySelectorAll('.tasks');
    console.log(taskText);
    if (taskText == "")
        alert("Enter new task!");
    else if (taskList.indexOf(taskText) !== -1) {
        alert("Task already exist!\nEnter new task!")
    }
    else {
        //addNewTask(taskText);
        tasksDiv[0].append(newTaskElement(taskText));

    }
    resetInputField(newTaskField);
    updateFooter();
}

function resetInputField(newTaskField) {
    newTaskField[0].value = "";
    newTaskField[0].focus();
}


function newTaskElement(text) {
    taskList.push(text);
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    const h3 = document.createElement('h3');
    h3.classList.add('task-content');
    h3.textContent = text;
    taskDiv.append(h3);
    const span = document.createElement('span');

    const delBtn = document.createElement('i');
    delBtn.classList.add('fa-solid');
    delBtn.classList.add('fa-trash');
    delBtn.classList.add('fa-1x');

    delBtn.onclick = function () {
        const getTaskContent = this.parentNode.parentNode.getElementsByTagName('h3')[0].textContent;
        removeFromTaskList(getTaskContent);
        this.parentNode.parentNode.remove();
    }
    span.append(delBtn)
    taskDiv.append(span);
    return taskDiv;
}

function removeFromTaskList(text) {
    const index = taskList.indexOf(text);
    if (index !== -1) {
        taskList.splice(index, 1);
        console.log('Item removed from list');
    }
    else console.log('removeFromTaskList ERROR!');
    updateFooter();
}

function updateFooter() {
    const taskLength = taskList.length;
    const text = taskLength ? `You have ${taskLength} pending tasks` :
        `You have no tasks pending :)`;
    const footerElem = document.getElementsByClassName('footer-text')[0];
    console.log(footerElem.textContent);
    footerElem.textContent = text;
    const clearAllBtn = document.getElementsByClassName('clear-all')[0];
    console.log(taskLength);
    clearAllBtn.disabled = taskLength ? false : true; 
}

