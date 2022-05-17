let addbBtn = document.querySelector(".submitBtn")
let inputText = document.querySelector(".taskText")
let tasks = null


if (tasks != null) {
    console.log(tasks)
    tasks.forEach(function (task) {
        console.log(task)
        task.addEventListener('click', ({
                target
            }) =>
            console.log(task))
    })
}




addbBtn.addEventListener('click', () => {
    let taskContent = inputText.value
    if (taskContent != "") {
        createTaskDiv(taskContent)
        createDeleteBtn()
        inputText.value = ""
    }

})

function createDeleteBtn(){
    
}

function createTaskDiv(taskContent) {
    const para = document.createElement("div");
    para.className = "task"
    para.onclick=function(event){(alert(para.innerText))}
    const node = document.createTextNode(taskContent);
    para.appendChild(node);
    const element = document.getElementById("container-tasks");
    element.appendChild(para);
    tasks = document.querySelectorAll('.task')
}