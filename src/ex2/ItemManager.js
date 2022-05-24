class ItemManager
{
    constructor()
    {
        this.todos = [];
        this.pokemon_client = new PokemonClient();
    }


    async AddTodo(todo_text)
    {
       
        const result = Promise.resolve(this.pokemon_client.GetPokemonById(todo_text));   
        await result;
        result.then((res) => {
            if(res.name !== "Error")
                this.todos.push(`Catch ${res.name}`);
            else
                this.todos.push(res.message);
            return;
        });        
    }

    RemoveTodo(task_to_remove_id)
    {
        const todo = this.todos.splice(task_to_remove_id, 1);
    }

}