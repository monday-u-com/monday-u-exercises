
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
            this.item_manager.AddTodo(this.dom_manager.task_input.value);
            this.dom_manager.AddNewTask();
        });        
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


}




const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    main.init();
});