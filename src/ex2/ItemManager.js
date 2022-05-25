class ItemManager {
    constructor() {
        this.tasks = [];
        this.pokemon_client = new PokemonClient();
    }

    /**
     * gets string and checks what case it is 
     * @param {string} task_text string from input
     */
    async AddTask(task_text) {
        // parse text to int
        const pokemon_id = parseInt(task_text);
        if (task_text.indexOf(',') > -1) // check if text has commas
        {
            await this.GetMultiplePokemons(task_text);
        }
        else if (Number.isInteger(pokemon_id)) // check if its number
        {
            await this.GetOnePokemon(pokemon_id);
        }
        else // regular task 
            this.tasks.push(task_text);
    }
    /**
     * removes a task from array
     * @param {int} task_to_remove_id task location in array
     */
    RemoveTask(task_to_remove_id) {
        this.tasks.splice(task_to_remove_id, 1);
    }

    /**
     * send id to pokemon client and insert it to tasks array
     * @param {int} id 
     */
    async GetOnePokemon(id) {
        // send the id to pokemon client
        const result = Promise.resolve(this.pokemon_client.GetPokemonById(id));
        // wait for response
        await result;
        result.then((res) => {
            this.InsertResultToArray(res);
        });
    }

    /**
     * parse string from input send it to pokemon client and insert it to tasks array
     * @param {string} ids string from input 
     */
    async GetMultiplePokemons(ids) {
        const pokemon_ids = ids.split(',');
        const result = Promise.resolve(this.pokemon_client.GetPokemonsByList(pokemon_ids));
        await result;
        result.then((all_data) => {
            // run on all fetch results
            all_data.forEach(res => {
                this.InsertResultToArray(res);
            });
        });
    }

    /**
     * inserts result to 
     * @param {string} result 
     * @param {int} id 
     */
    InsertResultToArray(result) {
        // check if found pokemon
        if (result.name !== "Error")
        {
            if(!this.CheckIfPokemonExists(result.id))
                this.tasks.push({name: result.name, images: result.sprites, id: result.id});// found pokemon add the name and id of pokemon 
        }
        else
            this.tasks.push({data: result.message, id: "Error"});// did not find pokemon 
    }

    /**
     * clear all tasks
     */
    ClearArray() {
        this.tasks = [];
    }

    /**
     * sort tasks array 
     */
    SortArrayByName() {
        this.tasks.sort((a, b) => {
            // tasks object has name or data for error
            const item1 = a.name || a.data;
            const item2 = b.name || b.data;
            return item1.toLowerCase().localeCompare(item2.toLowerCase());
        });
    }
    
    /**
     * check if pokemon is in tasks
     * @param {int} id id of pokemon to find
     * @returns true if found false if not found
     */
    CheckIfPokemonExists(id)
    {
        return this.tasks.find(task => task.id === id);
    }
}