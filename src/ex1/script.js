// get buttons, input, containers elements
const task_input = document.querySelector('input[name="todo"]');
const add_task_button = document.querySelector('div[class="add_to_do_button"]');
const clear_all_button = document.querySelector('button[name="clear_all_todo"]');
const sort_by_name_button = document.querySelector('button[name="sort_by_name_todo"]');
const tasks_container = document.querySelector('.todo_tasks_container');
const tasks_element = {
    html: `<div class="todo_task animate__animated animate__fadeIn">
                <span class="task_number"></span>
                <span class="task_text"></span>
                <div class="task_buttons">
                    <div class="delete_task_button">
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                    <div class="complete_task_button">
                        <i class="fa-solid fa-check"></i>
                    </div>
                </div>
            </div>`
};
const Section_in_task = {
    NUMBER: 0,
    TEXT: 1,
    BUTTONS: 2,
    DELETE_BUTTON: 0,
    COMPLETE_BUTTON: 1
}

// set observer to trigger only on dom tree change
const config_observer = { childList: true };
// create observer and assign call back function
const observer = new MutationObserver(OnDomChange); 

// set event to objects
SetOnEventListener("click", add_task_button, AddNewTask, task_input, tasks_container, tasks_element, observer, config_observer);

SetOnEventListener("keypress", task_input, AddNewTaskByKeyPress, add_task_button);
SetOnEventListener("input", task_input, ClearErrorEmptyTask, task_input);

SetOnEventListener("click", clear_all_button, ClearAllTasks, tasks_container);

SetOnEventListener("click", sort_by_name_button, SortByName, tasks_container);

/**
 * Click call back function to add new task
 * @param {object} task_input 
 * @param {object} tasks_container 
 * @param {object} tasks_element 
 * @param {object} observer 
 * @param {object} config_observer 
 * @returns 
 */
function AddNewTask(task_input, tasks_container, tasks_element, observer, config_observer)
{
    const todo_text = task_input.value;      
    let task;
    if(todo_text.length)
    {
        if(tasks_container.classList.contains('empty'))
        {
            tasks_container.classList.remove('empty');
            SetObserver(tasks_container, observer, config_observer);
        }

        task = CreateElementFromHtml(tasks_element.html); // create element from html string in object tasks_element
        SetOnEventListener("click", task.children[Section_in_task.TEXT], AlertTask, task); // set on click event for new task
        SetOnEventListener("click", task.children[Section_in_task.NUMBER], AlertTask, task); // set on click event for new task
        //task.children[0].innerHTML = tasks_element.id + ')';
        task.children[1].innerHTML = todo_text; // set text from input to task
        SetOnEventListener("click", task.children[Section_in_task.BUTTONS].children[Section_in_task.DELETE_BUTTON], DeleteTask, task, tasks_container); // set a delete on click event
        SetOnEventListener("click", task.children[Section_in_task.BUTTONS].children[Section_in_task.COMPLETE_BUTTON], MarkAsComplete, task); // set a complete on click event        
        tasks_container.appendChild(task);
        task_input.value = '';
        SortTasksNumber(tasks_container);
        return;
    }
    ShowErrorEmptyTaskInput(task_input);
};

/**
 * On key press call back function for adding new task by enter key
 * @param {object} add_task_button 
 */
function AddNewTaskByKeyPress(add_task_button)
{    
    if(this.event.key === "Enter") 
    {
        this.event.preventDefault();
        add_task_button.click();
    }
}
/**
 * Click call back function for deleting all tasks
 * @param {object} tasks_container 
 */
function ClearAllTasks(tasks_container)
{
    while(tasks_container.firstChild)
    {
        tasks_container.removeChild(tasks_container.firstChild);
    }
    tasks_container.classList.add('empty');
};
/**
 * Click call back function for deleting task
 * @param {object} task 
 * @param {object} tasks_container 
 */
function DeleteTask(task, tasks_container)
{
    task.classList.remove('animate__fadeIn');
    task.classList.add('animate__fadeOut');
    setTimeout(() => {
        task.remove();
        SortTasksNumber(tasks_container);
        if(tasks_container.children.length === 0)
            tasks_container.classList.add('empty');
    }, 500);
};

/**
 * Click call back function to set the task as completed
 * @param {object} task 
 */
function MarkAsComplete(task)
{
    task.classList.toggle('completed_task');
};
/**
 * Click call back function to alert task name
 * @param {object} task 
 */
function AlertTask(task)
{
    alert(task.children[1].innerHTML);
};

/**
 * Sets invalid state on add new task text input with a supplies error message
 * @param {object} task_input 
 */
function ShowErrorEmptyTaskInput(task_input)
{
    task_input.reportValidity();
    task_input.setCustomValidity("Please supply a task name.");
}
/**
 * Clear invalid state on add new task text input
 * @param {object} task_input 
 */
function ClearErrorEmptyTask(task_input)
{
   task_input.setCustomValidity("");
}

/**
 * On dom tree change update counter
 * @param {object} mutation_list 
 * @param {MutationObserver} observer 
 */
function OnDomChange(mutation_list, observer)
{
    const count_tasks = document.querySelector('div[class="todo_status_text"]').children[1];// select counter element
    const tasks = document.querySelector('.todo_tasks_container');
    mutation_list.forEach( (mutation) => {
        if(!tasks.classList.contains('empty'))
            count_tasks.innerHTML = tasks.children.length;
        else
            count_tasks.innerHTML = 0;
        console.log("debug: dom changed");
    });
};

/**
 * Start an observer to task_container to check if the dom tree is changed
 * @param {object} tasks_container 
 * @param {MutationObserver} observer 
 * @param {object} config_observer 
 */
function SetObserver(tasks_container, observer, config_observer)
{
   observer.observe(tasks_container, config_observer);
};

/**
 * Sets an event listener to object with parameters
 * @param {string} event 
 * @param {object} element 
 * @param {function} call_back_func 
 * @param  {...object} param 
 */
function SetOnEventListener(event, element, call_back_func, ...param)
{
    if(param === undefined)
        element.addEventListener(event, () => call_back_func);
    else
        element.addEventListener(event, () => call_back_func(...param));
};

/**
 * Creates a html object from html string
 * @param {string} html 
 * @returns 
 */
function CreateElementFromHtml(html)
{
    let temp = document.createElement('template');
    html = html.trim();
    temp.innerHTML = html;
    return temp.content.firstChild;
};

/**
 * Sorts the tasks by number and updates the numbers 
 * @param {object} tasks_container 
 */
function SortTasksNumber(tasks_container)
{
    let tasks = tasks_container.children;
    for (let i = 0; i < tasks.length;i++)
    {
        tasks[i].children[Section_in_task.NUMBER].innerHTML = (i + 1).toString().concat(")");
    }
};

/**
 * Sorts the tasks by names
 * @param {object} tasks_container 
 */
function SortByName(tasks_container)
{
    const tasks = [...tasks_container.children];
    tasks.sort((item1, item2) =>
    {
        const task1_name = item1.querySelector(".task_text").innerHTML;
        const task2_name = item2.querySelector(".task_text").innerHTML;
        return task1_name.toLowerCase().localeCompare(task2_name.toLowerCase());
    });
    tasks.forEach(task => { tasks_container.appendChild(task); });
    SortTasksNumber(tasks_container);
};

