class DomManager {
    constructor() {
        this.task_input = document.querySelector("#todo_input");
        this.task_container = document.querySelector("#todo_tasks_container");
        this.add_task_button = document.querySelector("#add_to_do_button");
        this.tasks_counter = document.querySelector("#task_counter");
        this.clear_all_button = document.querySelector("#clear_all_tasks_button");
        this.sort_by_name_button = document.querySelector("#sort_by_name");;
    }

    /**
     * clears input value
     */
    clearInput() {
        this.task_input.value = "";
    }

    /**
    * Click call back function to add new task
    */
    AddNewTask(id, text, delete_call_back) {
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
        task_delete_button.id = id;
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
        task_text.innerHTML = text;
        this.clearInput();

        // adds icons to buttons
        task_delete_button.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        task_complete_button.innerHTML = '<i class="fa-solid fa-check"></i>';

        // adds event listeners to elements
        task_delete_button.addEventListener("click", (event) => {
            delete_call_back(event);
        });
        task_complete_button.addEventListener("click", this.MarkAsCompleteTask);
        task_text.addEventListener("click", this.TaskClick);

        // updates task counter
        this.UpdateTaskCounter();
    }

    /**
    * On key press call back function for adding new task by enter key
    */
    AddNewTaskByKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            this.add_task_button.click();
        }
    }

    /**
     * toggle complete task class
     */
    MarkAsCompleteTask() {
        this.parentNode.parentNode.classList.toggle("completed_task");
    }

    /**
     * task click call back function
     */
    TaskClick() {
        alert(this.innerHTML);
    }

    /**
     * updates tasks counter
     */
    UpdateTaskCounter() {
        const tasks_number = this.task_container.children.length;
        this.tasks_counter.innerHTML = tasks_number;
    }

    /**
     * show empty input validation
     */
    ShowErrorEmptyTaskInput() {
        this.task_input.reportValidity();
        this.task_input.setCustomValidity("Please supply a task name.");
    }

    /**
     * clear empty input error validation
     */
    ClearErrorEmptyTask() {
        this.task_input.setCustomValidity("");
    }
    /**
     * render the dom by todo array from item manager
     * @param {array} todos 
     * @param {function} delete_call_back 
     */
    RenderDomFromArray(todos, delete_call_back) {
        const todos_copy = [...todos];
        // clear task container for rendering
        this.task_container.innerHTML = "";
        todos_copy.map((todo, key) => {
            this.AddNewTask(key, todo.data, delete_call_back);
        });
        this.UpdateTaskCounter();
    }
}