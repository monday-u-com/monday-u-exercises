let addTaskBtn = document.querySelector(".submitBtn")
let inputText = document.querySelector(".taskText")

//Handle Image
function addImg() {
    const img = document.createElement("img");
    img.id = "noTaskImg"
    img.src = "https://memegenerator.net/img/instances/43020609.jpg";
    const src = document.getElementById("div");
    src.appendChild(img);
}

function removeImg() {
    const img = document.getElementById('noTaskImg');
    img.parentNode.removeChild(img);
}
////


// Handle Add Task

addTaskBtn.addEventListener('click', (event) => {
    let taskContent = inputText.value
    if (taskContent != "") {
        event.preventDefault()
        if (document.querySelector('#noTaskImg')) {
            removeImg()
        }
        createTaskDiv(taskContent)
        inputText.value = ""
    }
})

function createTaskDiv(taskContent) {
    const task = addTaskContent(taskContent)
    addDeleteBtn(task)
    addDoneBtn(task)
}

function addTaskContent(taskContent) {
    const task = document.createElement("div");
    task.className = "task"

    task.onclick = function (event) {
        event.cancelBubble = true;
        event.preventDefault()
        alert(taskContent)
        console.log(task.textContent)
    }

    const node = document.createTextNode(taskContent);
    task.appendChild(node);
    const element = document.getElementById("container-tasks");
    element.appendChild(task);
    return task;

}

function addDeleteBtn(task) {
    const btn = document.createElement("button");
    btn.className = "removeTask-btn"
    btn.textContent = 'X';

    btn.onclick = function (event) {
        event.preventDefault()
        event.stopPropagation()
        this.parentNode.parentNode.removeChild(this.parentNode);
        if (!document.querySelector('.task')) {
            addImg()
        }
    }

    task.appendChild(btn)
}


function addDoneBtn(task) {
    const input = document.createElement("input");
    input.className = "taskDone-btn"
    input.type = "checkbox"

    input.onclick = function (event) {
        event.stopPropagation()
        if (input.checked) {
            input.parentNode.className = "taskDone-btn-pressed"
        } else {
            input.parentNode.className = "task"
        }
    }
    task.appendChild(input)
}
