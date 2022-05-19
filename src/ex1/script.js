let addTaskBtn = document.querySelector(".submitBtn")
let inputText = document.querySelector(".taskText")


addImg()

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


//Check which btn was pressed, if delete, check if there are any more tasks to do




addTaskBtn.addEventListener('click', () => {
    let taskContent = inputText.value
    if (taskContent != "") {
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

}

function addTaskContent(taskContent) {
    const task = document.createElement("div");
    task.className = "task"

    task.onclick = function (event) {
        event.stopPropagation()
        alert(task.outerText)
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
    btn.appendChild(document.createTextNode("X"));

    btn.onclick = function (event) {
        event.stopPropagation()
        this.parentNode.parentNode.removeChild(this.parentNode);
        if (!document.querySelector('.task')) {
            addImg()
        }
    }

    task.appendChild(btn)
}


// function addDoneBtn(task) {
//     const input = document.createElement("input");
//     input.className = "taskDone-btn"
//     input.type = "checkbox"

//     input.onclick = function (event) {
//         event.stopPropagation()
//         input.parentNode.className = "taskDone-btn-pressed"
//         console.log(input.parentNode.className)
//         if (input.parentNode.className == "taskDone-btn-pressed") {
//             input.parentNode.className = "task"
//         } else input.parentNode.style.back == "taskDone-btn-pressed"
//     }

//     task.appendChild(input)
// }



function onTaskDone(even) {

}