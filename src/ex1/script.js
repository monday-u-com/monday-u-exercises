let input = document.querySelector(".newTask input");
const add = document.querySelector(".newTask button");
const tasksView = document.querySelector(".tasks");
const tasks = [];
const howManyTasks = document.querySelector(".bottom .howMany");
const showClearAll = document.querySelector(".bottom .clear");
const showSort = document.querySelector(".bottom .sort");

//defult massege displayed when there are no tasks
const defultMassage = 'Please add your TO-DO List!';
howManyTasks.innerHTML = defultMassage;

//add new tasks
add.addEventListener('click', () => { //recognize click on 'add' button
    addNewTask(input.value);
});

input.addEventListener('keypress', (event) => { //recognize pressing enter key
    if (event.keyCode === 13) {
        event.preventDefault();
        addNewTask(input.value);
    }
});

function addNewTask(value) {
    if (value === '') {
        alert("You can't add an empty task");
    }
    else {
        showTasks(value);
        updateBottom();
    }
}

//show the tasks
function showTasks(newTask) { //adds new task to tasks array and adds it to html
    let newLiTag = '';
    if (newTask != undefined) {
        tasks.push(newTask);
    }
    tasks.forEach((element, index) => {
        newLiTag += '<li onClick="taskAlert('+index+')">'+element+'<span onClick="deleteTask('+index+');event.stopPropagation();">&#x1F5D1;</span></li>';
    });
    tasksView.innerHTML = newLiTag;
    input.value = ""; //clears the input after adding task
}

//updates the bottom
function updateBottom() { //modify the amount of tasks displayed
    if (tasks.length >= 1) {
        let newSpan = '';
        newSpan = '<span>You have '+tasks.length+' pending tasks</span>'
        howManyTasks.innerHTML = newSpan;
        if (tasks.length === 1) { //display clear all button only when there are tasks
            showClearAll.style = 'display: block';
            showSort.style = 'display: block';
        }
    }
    else { //delete clear all button when there aren't tasks
        showClearAll.style = 'display: none';
        showSort.style = 'display: none';
        howManyTasks.innerHTML = defultMassage;
    }
}

//delete task
function deleteTask(index){
    tasks.splice(index, 1);
    showTasks();
    updateBottom();
}

//clear all
showClearAll.addEventListener('click', () => { //recognize click on 'clear all' button
    tasks.length = 0;
    showTasks();
    updateBottom();
});

//task alert
function taskAlert(index) {
    alert(tasks[index]);
}

//sort
showSort.addEventListener('click', () => { //recognize click on 'sort' button
    tasks.sort();
    showTasks();
});
