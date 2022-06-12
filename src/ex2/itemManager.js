class ItemManager {
    constructor() {
        this.taskList = [];
        this.pokemonClient = new PokemonClient();
    }

    async addCatchPokemonTask(IDs) {
        const newTaskList = [...this._getTaskList()];
        const pClient = this.pokemonClient;

        IDs.map((num) => parseInt(num));
        try {
            const pokemonsRawJson = await pClient.catchPokemons(IDs);
            const pokemonsNames = pokemonsRawJson.map((pokemon) => pokemon.name);
            pokemonsNames.forEach((pokemon) => {
                const newText = 'Catch: ' + pokemon;
                if (!this._isTaskExist(newText))//task already exist
                    newTaskList.push(newText);
            })
        }
        catch { //GET request failed                    
            const newText = 'Failed to catch pokemon with this input: ' + IDs;
            if (!this._isTaskExist(newText))
                newTaskList.push(newText);
        }
        // }
        this._setTaskList(newTaskList);
    }

    addPlainTextTask(text) {
        const newTaskList = [...this._getTaskList()];
        if (!this._isTaskExist(text))
            newTaskList.push(text);
        this._setTaskList(newTaskList);
    }

    _isTaskExist(text) {
        const taskList = this._getTaskList();
        if (taskList.indexOf(text) !== -1) {
            alert("Task already exist!\nEnter new task!");
            return true;
        }
        return false;
    }

    removeTask(text) {
        const newTaskList = [...this._getTaskList()];
        const index = newTaskList.indexOf(text);

        if (index !== -1) {//text found and index number returned
            newTaskList.splice(index, 1);
            this._setTaskList(newTaskList);
            console.log('Item removed from list');
        }
        else console.log('removeFromTaskList ERROR!');
    }

    removeAllTasks() {
        this._setTaskList([]);
    }


    _getTaskList() {
        return this.taskList;
    }

    _setTaskList(newTaskList) {
        this.taskList = newTaskList;
    }


}

