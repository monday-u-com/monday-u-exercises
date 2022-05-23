class ItemManager
{
    constructor()
    {
        this.todos = [];
    }


    AddTodo(todo_text)
    {
        this.todos.push(todo_text);
    }

    RemoveTodo(task_to_remove_id)
    {
        const todo = this.todos.splice( task_to_remove_id,1);
    }

}