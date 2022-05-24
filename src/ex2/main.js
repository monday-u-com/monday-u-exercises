
// Implement the `Main` class here

class Main {
    constructor() {
        this.dom_manager = new DomManager();
        this.item_manager = new ItemManager();
    }
    /**
     * init all event listeners
     */
    init() {
        this.dom_manager.add_task_button.addEventListener("click", () => {
            this.AddButtonCallBack();
        });

        // on enter key press event
        this.dom_manager.task_input.addEventListener("keypress", (event) => {
            this.dom_manager.AddNewTaskByKeyPress(event);
        });

        this.dom_manager.clear_all_button.addEventListener("click", () => {
            this.item_manager.ClearArray();
            this.RerenderFunctionWrapper();
        });

        this.dom_manager.sort_by_name_button.addEventListener("click", () => {
            this.item_manager.SortArrayByName();
            this.RerenderFunctionWrapper();
        });
    }
    /**
     * add button call back function
     */
    async AddButtonCallBack() {
        // check if input is not empty
        if (this.dom_manager.task_input.value) {
            // clear error message
            this.dom_manager.ClearErrorEmptyTask();
            // send the todo to item manager
            const add_promise = Promise.resolve(this.item_manager.AddTask(this.dom_manager.task_input.value));
            // wait to get response before re-rendering
            await add_promise;
            this.RerenderFunctionWrapper();
        }
        else
            this.dom_manager.ShowErrorEmptyTaskInput(); // set empty error message
    }
    /**
     * removes task from array
     * @param {Event} event click event object
     */
    RemoveTodo(event) {
        const task_id = event.currentTarget.id;
        this.item_manager.RemoveTask(task_id);
        this.RerenderFunctionWrapper();
    }
    /**
     * function to wrap the re-render
     */
    RerenderFunctionWrapper()
    {
        this.dom_manager.RenderDomFromArray(this.item_manager.tasks, (event) => {
            this.RemoveTodo(event);
        });
    }
}




const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    main.init();
});