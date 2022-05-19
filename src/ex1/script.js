document.querySelector('form').addEventListener('submit', submitButtonHandler)
document.querySelector('ul').addEventListener('click', checkHandler)
document.querySelector('ul').addEventListener('click', deleteHandler)
document.getElementById('clear-all').addEventListener('click', clearAllHandler)
document.querySelector('ul').addEventListener('click', alertMessage)
/*document.getElementById('new-task').addEventListener('keydown', preventSpace)*/
const tasksCompleted = document.getElementById('completed-tasks')
const listGif = document.getElementById('list-gif')

let doneTasksFlag = false //Checks whether the list item was checked as done or not
let doneTasksCounter = 0 //Counts the amount of the list items that are checked as done
let tasksCounter = 0 //Counts the amount of list items in general 


/*** Submit Button Handler ***/
function submitButtonHandler(event){
    event.preventDefault() //Preventing page refresh on form submission
    const newTaskInput = document.querySelector('#new-task')
    listGif.style.display= "none"
    if (newTaskInput.value != ''){
        tasksCompleted.style.display = "flex"
        addTodo(newTaskInput.value)
        tasksCompleted.innerText = `You have completed ${doneTasksCounter} / ${tasksCounter} tasks`
        newTaskInput.value = '' //After inserting a new task, the new task input area will be initialized to an empty string
    }
}

function addTodo(item){
    const ul = document.querySelector('ul')
    const li = document.createElement('li') //Creating a new 'li' element which refers to a new task that has been submitted

    //Inserting text content to the 'li' element
    li.innerHTML = `
        <input type="checkbox" name="task-complete"> 
        <span class="task-item">${item}</span> 
        <button id="deleteButton" name="deleteButton"><i class="fas fa-trash"></i></button>
    `
    li.classList.add('task-list-item') //Adding the user's input into the list
    ul.appendChild(li)
    tasksCounter++
}

//Prevents "space" click on keyboard  
/*function preventSpace(event){
    if(event.code === 'Space') {
        event.preventDefault()
    }
}*/


/*** Task Done Checkbox */
function checkHandler(event){
    if(event.target.name === 'task-complete'){
        checkTodo(event)
    }
}

function checkTodo(event){
    let item = event.target.parentNode
    //When clicking on the check button after it was already checked as done, the line through style will be removed
    if(item.style.textDecoration === 'line-through'){
        item.style.textDecoration = 'none'
        item.style.color = 'grey'
        doneTasksCounter--
        item.doneTasksFlag = false
        tasksCompleted.innerText = `You have completed ${doneTasksCounter} / ${tasksCounter} tasks`
    }
    //When clicking on the check button in order to mark the task as done, the line through style will be implemented
    else{
        item.style.textDecoration = 'line-through'
        item.style.color = 'lightgrey'
        doneTasksCounter++
        item.doneTasksFlag = true
        tasksCompleted.innerText = `You have completed ${doneTasksCounter} / ${tasksCounter} tasks`
    }
}


/*** Delete Button ***/
function deleteHandler(event){
    if(event.target.name === 'deleteButton'){
        deleteTodo(event)
    }
}

function deleteTodo(event){
    let item = event.target.parentNode
    //Once the transition is completed, the task will be deleted 
    item.addEventListener('transitionend', function(){
        item.remove()
    })  
    tasksCounter--
    //If the list item was marked as done, then remove the counter by one
    if(item.doneTasksFlag === true){
        doneTasksCounter--
    }
    if(tasksCounter === 0){
        tasksCompleted.style.display = "none"
        listGif.style.display= "block"
        doneTasksCounter = 0
    }
    item.classList.add('task-delete-animation')
    tasksCompleted.innerText = `You have completed ${doneTasksCounter} / ${tasksCounter} tasks`
}


/*** Clear All Button ***/
function clearAllHandler(event){
    const itemList = document.querySelector('ul')
    while (itemList.hasChildNodes()){
        itemList.removeChild(itemList.firstChild)
        tasksCompleted.style.display = "none"
        listGif.style.display= "block"
        tasksCounter = 0
        doneTasksCounter = 0
    }
}


/*** List Item Clicked ***/
function alertMessage(event){
    if(event.target.name != 'task-complete' && event.target.name != 'deleteButton'){
        alert(event.target.innerText);
    }
}