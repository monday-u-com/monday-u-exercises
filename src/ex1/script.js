
function addTask(){
    const task = document.getElementById('newTask');
    // check if entered empty task
    if (task.value === ''){
        alert("You forgot to type the task!");
        return;
    }
    if (document.getElementById(task.value) !== null){
        alert("You already have that task!");
        task.value = '';
        return;
    }
    if (task.value){
        // create div for task + delete button
        const task_section = document.createElement("div");
        task_section.className = "taskSection";
        task_section.id = task.value;
        document.body.querySelector("div.taskList").appendChild(task_section);
        // create the task
        const task_elem = document.createElement("div");
        task_elem.className = "tasks";
        task_elem.onclick = () => alert("Task: \n" + task_text.innerText);
        const task_text = document.createElement("p");
        task_text.innerText = task.value;
        task_elem.appendChild(task_text);
        task_elem.appendChild(taskTime());
        document.getElementById(task.value).appendChild(task_elem);
        // create delete button
        const delete_btn = document.createElement("button");
        delete_btn.className = "deleteBtn";
        delete_btn.onclick = () => {
            task_section.classList.add("removed");
            setTimeout(() => {
                task_section.remove(); 
            }, 1000);
            return;
        }
        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa fa-trash-o";
        delete_btn.appendChild(deleteIcon);
        document.getElementById(task.value).appendChild(delete_btn);
        // delete input
        task.value = '';        
    }
};

// returns the element that shows the date & time the task created
function taskTime(){
    today = new Date();
    const p = document.createElement("p");
    let minutes = String(today.getMinutes());
    if (minutes.length === 1){
        minutes = "0" + minutes;
    }
    p.innerHTML = today.getDate() + "/" + 
                  (today.getMonth()+1) + "/" + 
                  today.getFullYear() + "<br/>" + 
                  today.getHours() + ":" + 
                  minutes;
    p.className = "time";
    p.id = today;
    p.style.fontSize = '10px';
    return p;
};

// clear all tasks
function clearAll(){
    const tasks = document.body.querySelectorAll("div.taskSection");
    tasks.forEach(elem => {
        elem.classList.add("removed");
        setTimeout(()=> {
            elem.remove();
        }, 1000);
    });
};

// sort tasks by date they created
function sortTime(){
    const taskSections = document.body.querySelectorAll("div.taskSection");
    let ts_array = [].map.call(taskSections, function(elem){return elem;});
    ts_array.sort(function(a,b){
        a = a.querySelector("div.tasks").querySelector("p.time").id;
        b = b.querySelector("div.tasks").querySelector("p.time").id;
        if (asc_time){
            return new Date(a) - new Date(b);
        }
        return new Date(b) - new Date(a);
    });
    asc_time = !asc_time;
    for (let i=0; i < ts_array.length; i++){
        taskSections[i].parentNode.appendChild(ts_array[i]);
    }
};

// sort tasks by name
function sortAZ(){
    const taskSections = document.body.querySelectorAll("div.taskSection");
    let ts_array = [].map.call(taskSections, function(elem){return elem;});
    ts_array.sort(function(a,b){
        a = a.querySelector("div.tasks").querySelector("p").innerText;
        b = b.querySelector("div.tasks").querySelector("p").innerText;
        if (asc_AZ){
            return a.localeCompare(b);
        }
        return b.localeCompare(a);
    });
    asc_AZ = !asc_AZ;
    for (let i=0; i < ts_array.length; i++){
        taskSections[i].parentNode.appendChild(ts_array[i]);
    }
};

// each time sort button is clicked it sorts the tasks ascending/descending
let asc_AZ = true;
let asc_time = false;
// can add tasks using the Enter key
const input = document.getElementById("newTask");
input.addEventListener("keypress", function(event){
    if (event.key === "Enter"){
        document.getElementById("addBtn").click();
    }
});