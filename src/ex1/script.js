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

// set event to objects
SetOnEventListener("click", add_task_button, AddNewTask, task_input, tasks_container, tasks_element);

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
function AddNewTask(task_input, tasks_container, tasks_element)
{
    const todo_text = task_input.value;   
    let task;
    if(todo_text.length)
    {
        tasks_container.classList.remove('empty');
        task = CreateElementFromHtml(tasks_element.html); // create element from html string in object tasks_element
        tasks_container.appendChild(task);
        SetOnEventListener("click", task.querySelector(".task_text"), AlertTask, task); // set on click event for new task
        SetOnEventListener("click", task.querySelector(".task_number"), AlertTask, task); // set on click event for new task
        task.querySelector(".task_number").innerHTML = (tasks_container.children.length + 1).toString().concat(')');
        task.querySelector(".task_text").innerHTML = todo_text; // set text from input to task
        SetOnEventListener("click", task.querySelector(".delete_task_button"), DeleteTask, task, tasks_container); // set a delete on click event
        SetOnEventListener("click", task.querySelector(".complete_task_button"), MarkAsComplete, task); // set a complete on click event                
        task_input.value = '';
        SortTasksNumber(tasks_container);
        SetTaskCounter(tasks_container);
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
};

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
    SetTaskCounter(tasks_container);
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
        SetTaskCounter(tasks_container);
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
};

/**
 * Clear invalid state on add new task text input
 * @param {object} task_input 
 */
function ClearErrorEmptyTask(task_input)
{
   task_input.setCustomValidity("");
};

/**
 * updates task counter
 * @param {object} task_container 
 */
function SetTaskCounter(task_container)
{
    const task_counter = document.querySelector(".task_counter");
    const tasks_number = task_container.children.length;
    task_counter.innerHTML = tasks_number;
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
    const tasks = [...tasks_container.children];
    tasks.sort( (task1, task2) => {
        const task1_number = parseInt(task1.querySelector(".task_number"));
        const task2_number = parseInt(task2.querySelector(".task_number"));
        return task1_number - task2_number;
    });
    tasks.forEach((task, key) => {task.querySelector(".task_number").innerHTML = (key + 1).toString().concat(")");});
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

