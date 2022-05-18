document.querySelector('form').addEventListener('submit', submitButtonHandler)
document.querySelector('ul').addEventListener('click', checkHandler)
document.querySelector('ul').addEventListener('click', deleteHandler)
document.getElementById('clear-all').addEventListener('click', clearAllHandler)
document.querySelector('ul').addEventListener('click', alertMessage)
/*document.getElementById('new-task').addEventListener('keydown', preventSpace)*/
const tasksCompleted = document.getElementById('completed-tasks')
let doneTasksCounter = 0
let tasksCounter = 0
let listGif = document.getElementById('list-gif')

/*** Submit Button Handler ***/
function submitButtonHandler(event){
    event.preventDefault() //Preventing page refresh on form submission
    let newTaskInput = document.querySelector('#new-task')
    listGif.style.display= "none"
    if (newTaskInput.value != ''){
        tasksCompleted.style.display = "flex"
        addTodo(newTaskInput.value)
        tasksCompleted.innerText = `You have completed ${doneTasksCounter} / ${tasksCounter} tasks`
        newTaskInput.value = '' //After inserting a new task, the new task input area will be initialized to an empty string
    }
}

function addTodo(item){
    let ul = document.querySelector('ul')
    let li = document.createElement('li') //Creating a new 'li' element which refers to a new task that has been submitted

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

/*function preventSpace(event){
    if(event.code === 'Space') {
        event.preventDefault()
    }
}*/



/*** Task Done Button */
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
        tasksCompleted.innerText = `You have completed ${doneTasksCounter} / ${tasksCounter} tasks`
    }
    //When clicking on the check button in order to mark the task as done, the line through style will be implemented
    else{
        item.style.textDecoration = 'line-through'
        item.style.color = 'lightgrey'
        doneTasksCounter++
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
    item.classList.add('task-list-item-fall')
    tasksCounter--
    
}


/*** Clear All Button ***/
function clearAllHandler(event){
    if(tasksCounter != 0){
        document.querySelector('ul').innerHTML = ''
        tasksCompleted.style.display = "none"
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