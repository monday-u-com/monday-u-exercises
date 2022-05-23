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

    RemoveTodo(todo_text)
    {
        const todo = this.todos.filter( (item) => 
        {
            return item === todo_text;
        });
    }

}