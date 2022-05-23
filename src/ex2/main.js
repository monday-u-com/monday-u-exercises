// Implement the `Main` class here

class Main
{
    constructor()
    {
        this.task_input = document.querySelector("#todo_input");
        this.task_container = document.querySelector("#todo_tasks_container");
        this.add_task_button = document.querySelector("#add_to_do_button");
        this.tasks_counter = document.querySelector("#task_counter");
        this.clear_all_button = document.querySelector("#clear_all_tasks_button");
        this.sort_by_name_button = document.querySelector("#sort_by_name");;
    }

    init()
    {
        this.add_task_button.addEventListener("click", () => {
            this.AddNewTask();
        });        
        this.add_task_button.addEventListener("keypress", (event)=> {
            this.AddNewTaskByKeyPress(event);
        });

        this.clear_all_button.addEventListener("click", () => {
            this.ClearAllTasks();
        });

        this.sort_by_name_button.addEventListener("click", () =>
        {
            this.SortByName();
        });
    }

    clearInput()
    {
        this.task_input.value = "";
    }

    /**
    * Click call back function to add new task
    */
    AddNewTask()
    {
        // creates new task elements
        const new_task = document.createElement("li");
        const task_text = document.createElement("span");
        const task_number = document.createElement("span");
        const task_buttons_container = document.createElement("div");
        const task_delete_button = document.createElement("button");
        const task_complete_button = document.createElement("button");         
        
        // adds class to elements
        new_task.classList.add("todo_task");
        new_task.classList.add("animate__animated");
        new_task.classList.add("animate__fadeIn");
        task_text.classList.add("task_text");
        task_number.classList.add("task_number");
        task_buttons_container.classList.add("task_buttons");
        task_delete_button.classList.add("delete_task_button");
        task_complete_button.classList.add("complete_task_button");

        // Delete empty state from task container
        this.task_container.classList.remove("empty");

        // appends elements to dom
        this.task_container.appendChild(new_task);
        new_task.appendChild(task_number);
        new_task.appendChild(task_text);
        task_buttons_container.appendChild(task_delete_button);
        task_buttons_container.appendChild(task_complete_button);
        new_task.appendChild(task_buttons_container);

        // adds numbers to tasks
        task_number.innerText = (this.task_container.children.length).toString().concat(")");

        // adds text to task
        task_text.innerHTML = this.task_input.value;
        this.clearInput();
        
        // adds icons to buttons
        task_delete_button.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        task_complete_button.innerHTML = '<i class="fa-solid fa-check"></i>';

        // adds event listeners to elements
        task_delete_button.addEventListener("click", (event) => {
            this.DeleteTask(event);
        });
        task_complete_button.addEventListener("click", this.MarkAsCompleteTask);
        task_text.addEventListener("click", this.TaskClick);        

        // updates task counter
        this.UpdateTaskCounter();     
    }

    /**
    * On key press call back function for adding new task by enter key
    */
    AddNewTaskByKeyPress(event)
    {    
        if(event.key === "Enter") 
        {
            this.add_task_button.click();
        }
    }

    DeleteTask(event)
    { 
        const task = event.currentTarget.parentNode.parentNode;
        // adds animation to task li
        task.classList.remove("animate__fadeIn");
        task.classList.add("animate__fadeOut");
        // removes task li from dom
        setTimeout(() => {
            task.remove();
            // checks if task container is empty 
            if(this.task_container.children.length)
                this.SortTasksNumber();
            else
                this.task_container.classList.add("empty");
        }, 500);  
    }

    MarkAsCompleteTask()
    {
        this.parentNode.parentNode.classList.toggle("completed_task");
    }

    TaskClick()
    {
        alert(this.innerHTML);
    }

    SortTasksNumber()
    {
        // copes tasks
        const tasks = [...this.task_container.children];
        // sorts tasks by number
        tasks.sort( (task1, task2) => {
            const task1_number = parseInt(task1.querySelector(".task_number"));
            const task2_number = parseInt(task2.querySelector(".task_number"));
            return task1_number - task2_number;
        });
        tasks.forEach((task, key) => {
            task.querySelector(".task_number").innerHTML = (key + 1).toString().concat(")");
        });
    }

    SortByName()
    {
        const tasks = [...this.task_container.children];
        tasks.sort((item1, item2) =>
        {
            const task1_name = item1.querySelector(".task_text").innerHTML;
            const task2_name = item2.querySelector(".task_text").innerHTML;
            return task1_name.toLowerCase().localeCompare(task2_name.toLowerCase());
        });
        tasks.forEach(task => {
             this.task_container.appendChild(task); 
        });
        this.SortTasksNumber();
    }

    UpdateTaskCounter()
    {
        const tasks_number = this.task_container.children.length;
        this.tasks_counter.innerHTML = tasks_number;
    }

    ClearAllTasks()
    {
        // copes tasks
        const tasks = [...this.task_container.children];
        // adds animation for tasks remove
        tasks.forEach((task) => {
            task.classList.remove("animate__fadeIn");
            task.classList.add("animate__fadeOut");
        });
        setTimeout(() => {
            this.task_container.innerHTML = "";
            this.task_container.classList.add("empty");
            this.UpdateTaskCounter();            
        }, 500);
    }

}




const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    main.init();
});