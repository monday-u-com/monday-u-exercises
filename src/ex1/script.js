let addTaskBtn = document.querySelector(".submitBtn")
let inputText = document.querySelector(".taskText")

addTaskBtn.addEventListener('click', (event) => {
    let taskContent = inputText.value;
    if (taskContent != "") {
        event.preventDefault();
        createTaskDiv(taskContent);
        inputText.value = "";
    }
})

function createTaskDiv(taskContent) {
    const task = addTaskContent(taskContent);
    addDeleteBtn(task);
    addDoneCheckBox(task);
    imageState();
}

function addTaskContent(taskContent) {
    const task = document.createElement("div");
    task.className = "task";
    task.id = "task"
    task.onclick = function (event) {
        event.cancelBubble = true;
        event.preventDefault();
        alert(taskContent);
    }
    const node = document.createTextNode(taskContent);
    task.appendChild(node);
    const element = document.getElementById("container-tasks");
    element.appendChild(task);
    return task;

}

function addDeleteBtn(task) {
    const btn = document.createElement("button");
    btn.className = "removeTask-btn";
    btn.textContent = 'X';
    btn.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.parentNode.parentNode.removeChild(this.parentNode);
        imageState();
    }
    task.appendChild(btn);
}


function addDoneCheckBox(task) {
    const input = document.createElement("input");
    input.className = "taskDone-btn";
    input.type = "checkbox";
    input.onclick = function (event) {
        event.stopPropagation();
        if (input.checked) {
            input.parentNode.className = "taskDone-btn-pressed";
        } else {
            input.parentNode.className = "task";
        }
    }
    task.appendChild(input);
}


function imageState() {
    const img = document.querySelector('#imageOnNoTasks')
    if (document.querySelectorAll('#task')) {
        console.log(document.querySelectorAll('.task'))
        img.className = 'noTasks-img-hidden'
    } else img.className = 'NoTasksImg-visible'
}