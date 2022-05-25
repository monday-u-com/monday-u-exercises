// get buttons, input, containers elements
const task_input = document.querySelector('input[name="todo"]');
const add_task_button = document.querySelector('.add_to_do_button');
const clear_all_button = document.querySelector('#clear_all_todo');
const sort_by_name_button = document.querySelector('#sort_by_name_todo');
const tasks_container = document.querySelector('#todo_tasks_container');
const tasks_list = [];
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

// set event to objects
SetOnEventListener("click", add_task_button, AddNewTask, task_input, tasks_element);

SetOnEventListener("keypress", task_input, AddNewTaskByKeyPress, add_task_button);
SetOnEventListener("input", task_input, ClearErrorEmptyTask, task_input);

SetOnEventListener("click", clear_all_button, ClearAllTasks);

SetOnEventListener("click", sort_by_name_button, SortByName);

/**
 * Click call back function to add new task
 * @param {object} task_input 
 * @param {object} tasks_element 
 * @returns 
 */
function AddNewTask(task_input, tasks_element)
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
        SetOnEventListener("click", task.querySelector(".delete_task_button"), DeleteTask, task); // set a delete on click event
        SetOnEventListener("click", task.querySelector(".complete_task_button"), MarkTaskAsComplete, task); // set a complete on click event                
        task_input.value = '';
        tasks_list.push(task);
        SortTasksNumber();
        SetTasksCounter();
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
 */
function ClearAllTasks()
{
    while(tasks_container.firstChild)
    {
        tasks_container.removeChild(tasks_container.firstChild);
    }
    tasks_container.classList.add('empty');
    SetTasksCounter(tasks_container);
};

/**
 * Click call back function for deleting task
 * @param {object} task  
 */
function DeleteTask(task)
{
    task.classList.remove('animate__fadeIn');
    task.classList.add('animate__fadeOut');
    setTimeout(() => {
        tasks_list.splice(tasks_list.indexOf(task), 1);
        SortTasksNumber();
        SetTasksCounter();
        if(tasks_container.children.length === 0)
            tasks_container.classList.add('empty');
    }, 500);
};

/**
 * Click call back function to set the task as completed
 * @param {object} task 
 */
function MarkTaskAsComplete(task)
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
 */
function SetTasksCounter()
{
    const task_counter = document.querySelector(".task_counter");
    const tasks_number = tasks_container.children.length;
    task_counter.innerHTML = tasks_number;
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
 */
function SortTasksNumber()
{
    tasks_container.innerHTML = "";
    tasks_list.forEach((task, key) => {
        FindChildInTasksArray(task.children, "task_number").innerText = `${key + 1})`;
        tasks_container.appendChild(task); 
    });
};

/**
 * Sorts the tasks by names 
 */
 function SortByName()
 {
    tasks_list.sort( (task1, task2) => {
        const task1_name = FindChildInTasksArray(task1.children, "task_text").innerHTML;
        const task2_name = FindChildInTasksArray(task2.children, "task_text").innerHTML;
        return task1_name.toLowerCase().localeCompare(task2_name.toLowerCase());
    });
    tasks_container.innerHTML = "";
    tasks_list.forEach(task => { tasks_container.appendChild(task);  });
    SortTasksNumber();
 };

/**
 * finds element in array with class
 * @param {Array} array array to search in 
 * @param {string} class_name class name of element to find
 * @returns element
 */
function FindChildInTasksArray(array, class_name)
{
    return Array.prototype.find.call(array, (child) => {
        return child.classList.contains(class_name);
    });
};