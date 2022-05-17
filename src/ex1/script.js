document.querySelector('form').addEventListener('submit', submitButtonHandler)
document.querySelector('ul').addEventListener('click', checkHandler)
document.querySelector('ul').addEventListener('click', deleteHandler)
document.getElementById('clear-all').addEventListener('click', clearAllHandler)
document.querySelector('ul').addEventListener('click', alertMessage)
document.getElementById('new-task').addEventListener('keydown', preventSpace)

/*** Submit Button Handler ***/
function submitButtonHandler(event){
    event.preventDefault() //Preventing page refresh on form submission
    let newTaskInput = document.querySelector('#new-task')
    if (newTaskInput.value != ''){
        document.querySelector('img').style.display = "none"
        addTodo(newTaskInput.value)
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
        <button name="deleteButton"><i class="fas fa-trash"></i></button>
    `
    li.classList.add('task-list-item') //Adding the user's input into the list
    ul.appendChild(li)
}

function preventSpace(event){
    if(event.code === 'Space') {
        event.preventDefault()
    }
}



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
    }
    //When clicking on the check button in order to mark the task as done, the line through style will be implemented
    else{
        item.style.textDecoration = 'line-through'
        item.style.color = 'lightgrey'
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
}


/*** Clear All Button ***/
function clearAllHandler(event){
    document.querySelector('ul').innerHTML = ''
    document.querySelector('img').style.display = "block"
}

/*** List Item Clicked ***/
function alertMessage(event){
    if(event.target.name != 'task-complete' && event.target.name != 'deleteButton'){
        alert(event.target.innerText);
    }
}