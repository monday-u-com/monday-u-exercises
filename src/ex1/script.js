
const addInput = document.getElementById('add-input');
const addBtn = document.getElementById('add-btn');
const sortBtn = document.getElementById('sort-btn');
const tasksList = document.getElementById('list-tasks');
const message = document.getElementById('message');
const clearAllBtn = document.getElementById('clear-btn');
const listEmptyMessage  = document.getElementById('empty-list');

let pending = 0;

// add Listeners
addBtn.addEventListener('click', addTaskHandler);
addInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addBtn.click();
  }
});
clearAllBtn.addEventListener('click', deleteAllHandler);
sortBtn.addEventListener('click',sortTasks);
message.innerText = 'you have 0 tasks pending';

function updatePending(operation){
  pending = operation(pending);
  message.innerText = `you have ${pending} tasks pending`;
}


function addTaskHandler(){
  const taskValue = addInput.value;
  if(!taskValue){
    alert('A task can not be empty');
  }else{
  if(!tasksList.children.length){
    listEmptyMessage.style.display = 'none';
    sortBtn.style.display = 'block';
  }
  
  const newTask = createTaskItem(taskValue);
  tasksList.appendChild(newTask);

  tasks.push({title: taskValue, isDone:false});
  updatePending((num)=>{return num++});

  addInput.value = null;
}
}

function deleteTaskHandler(task,event){
  event.stopPropagation();
  tasksList.removeChild(task);
  if(!tasksList.children.length){
    listEmptyMessage.style.display = 'flex';
    sortBtn.style.display = 'none';
  }

  updatePending((num)=>{return num--});
}


function deleteAllHandler(){
  let task = tasksList.lastElementChild;
  while(task){
    tasksList.removeChild(task);
    task = tasksList.lastElementChild;
  }

  updatePending((num)=>{return 0});
  listEmptyMessage.style.display = 'flex';
  sortBtn.style.display = 'none';
  
}


function checkTaskToggle(title,e){
  e.stopPropagation();
  title.classList.contains('checked-task')?
  title.classList.remove('checked-task'):
  title.classList.add('checked-task');

  updatePending((num)=>{return num++});
}


function onTaskClick(task){
  const taskValue = task.querySelector('h4');
  console.dir(taskValue);
  alert(taskValue.innerText);
}


function createTaskItem(task){
  const listItem = document.createElement('li');
  const title = document.createElement('h4');
  const deleteBtn = document.createElement('button');
  const checkbox = document.createElement('input');

  title.innerText = task;
  deleteBtn.innerHTML = '<i class="fa fa-trash"/>';
  checkbox.type = 'checkbox';

  deleteBtn.classList.add('delete-btn');
  listItem.classList.add('task');

  listItem.appendChild(checkbox);
  listItem.appendChild(title);
  listItem.appendChild(deleteBtn);

  checkbox.addEventListener('click', (e) => checkTaskToggle(title,e))
  deleteBtn.addEventListener('click', (e) => deleteTaskHandler(listItem,e));
  listItem.addEventListener('click',({target}) => onTaskClick(target))

  return listItem;
}


function sortTasks(){
  let tasks,i, switching, shouldSwitch;
  switching = true;
  while (switching) {
    switching = false;
    tasks = tasksList.children;
    for (i = 0; i < (tasks.length - 1); i++) {
      shouldSwitch = false;
      if (tasks[i].innerText.toLowerCase() > tasks[i + 1].innerText.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      tasks[i].parentNode.insertBefore(tasks[i + 1], tasks[i]);
      switching = true;
    }
  }
}


