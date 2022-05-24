
// Implement the `Main` class here

class Main
{
    constructor()
    {
        this.dom_manager = new DomManager();
        this.item_manager = new ItemManager();
    }

    init()
    {
        this.dom_manager.add_task_button.addEventListener("click", () => {
            this.AddButtonCallBack();
        });

        // on enter key press event
        this.dom_manager.add_task_button.addEventListener("keypress", (event)=> {
            this.dom_manager.AddNewTaskByKeyPress(event);
        });

        this.dom_manager.clear_all_button.addEventListener("click", () => {
            this.dom_manager.ClearAllTasks();
        });

        this.dom_manager.sort_by_name_button.addEventListener("click", () =>
        {
            this.dom_manager.SortByName();
        });
    }

    async AddButtonCallBack()
    {
        // check if input is not empty
        if(this.dom_manager.task_input.value)
        {
            // clear error message
            this.dom_manager.ClearErrorEmptyTask();
            // send the todo to item manager
            const add_promise = Promise.resolve(this.item_manager.AddTodo(this.dom_manager.task_input.value));
            // wait to get response before re-rendering
            await add_promise;
            this.dom_manager.RenderDomFromArray(this.item_manager.todos, (event) => {
                this.RemoveTodo(event);
            });
        }
        else
            this.dom_manager.ShowErrorEmptyTaskInput(); // set empty error message
    }

    RemoveTodo(event)
    {
        const task_id = event.currentTarget.id;
        this.item_manager.RemoveTodo(task_id);
        this.dom_manager.RenderDomFromArray(this.item_manager.todos, (event) => {
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