const addBtn = document.querySelectorAll('.add-task-btn');
const clearAllBtn = document.querySelectorAll('.clear-all-btn');
const addTaskField = document.querySelectorAll('.add-task-field');


const taskList = [];
addChillMsg();
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
    tasks[0].append(ChillMsg());
    updateFooter();
});

function addTaskFunc() {
    const newTaskField = document.querySelectorAll('.add-task-field');
    const taskText = newTaskField[0].value;
    const tasks = document.querySelectorAll('.tasks');
    console.log(taskText);
    if (taskText == "")
        alert("Enter new task!");
    else if (taskList.indexOf(taskText) !== -1) {
        alert("Task already exist!\nEnter new task!")
    }
    else {
        if (taskList.length === 0) tasks[0].replaceChildren();
        tasks[0].append(newTaskElement(taskText));
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
    addChillMsg();
    updateFooter();
}

function updateFooter() {
    const taskLength = taskList.length;
    const text = taskLength ? `You have ${taskLength} pending tasks` :
        `WooHoo!! You have no tasks pending!`;
    const footerElem = document.getElementsByClassName('footer-text')[0];
    console.log(footerElem.textContent);
    footerElem.textContent = text;
    const clearAllBtn = document.getElementsByClassName('clear-all-btn')[0];
    console.log(taskLength);
    clearAllBtn.disabled = taskLength ? false : true; 
}

function ChillMsg() {
    const div = document.createElement('div');
    div.classList.add('chill');
    const i1 = document.createElement('i');
    i1.classList.add('fa');
    i1.classList.add('fa-solid');
    i1.classList.add('fa-martini-glass-citrus');
    i1.classList.add('fa-4x');
    const i2 = document.createElement('i');
    i2.textContent = 'Chill out! Nothing to do';
    div.append(i1);
    div.append(i2);
    return div;

}

function addChillMsg() {
    if (taskList.length === 0) {
        const tasks = document.querySelectorAll('.tasks');
        tasks[0].append(ChillMsg());
    }
}