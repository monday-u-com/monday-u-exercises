class ItemManager
{
    constructor()
    {
        this.todos = [];
        this.pokemon_client = new PokemonClient();
    }


    async AddTodo(todo_text)
    {
        // parse text to int
        const todo_id = parseInt(todo_text);
        if(todo_text.indexOf(',') > -1)
        {
            const pokemon_ids = todo_text.split(',');
            const result = Promise.resolve(this.pokemon_client.GetPokemonsByList(pokemon_ids));
            await result;
            result.then((all_data) => {
                all_data.forEach(res => {
                    // check if found pokemon
                    if(res.name !== "Error")
                        this.todos.push(`Catch ${res.name}`);// found pokemon add the name of pokemon
                    else
                        this.todos.push(res.message);// did not find pokemon                 
                });
                return;
            }); 
        }
        else if(Number.isInteger(todo_id)) // check if its number
        {
            // send the id to pokemon client
            const result = Promise.resolve(this.pokemon_client.GetPokemonById(todo_text));   
            // wait for response
            await result;
            result.then((res) => {
                // check if found pokemon
                if(res.name !== "Error")
                    this.todos.push(`Catch ${res.name}`);// found pokemon add the name of pokemon

                else
                    this.todos.push(res.message);// did not find pokemon 
                return;
            }); 
        } 
        else
            this.todos.push(todo_text);
    }

    RemoveTodo(task_to_remove_id)
    {
        const todo = this.todos.splice(task_to_remove_id, 1);
    }

}