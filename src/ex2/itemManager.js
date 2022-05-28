class ItemManager {
    constructor() {
        this.taskList = [];
        this.pokemonClient = new PokemonClient();
    }

    async addTask(text) {
        const newTaskList = [...this.getTaskList()];
        const arr = text.split(',');
        const pClient = this.pokemonClient;
        
        if (this.isNumbers(arr)) {//check if input is array of number(s)
            let pokemonArray = [];
            arr.forEach((num) => pokemonArray.push(parseInt(num)));
            const pokemonsNames = await pClient.catchPokemons(pokemonArray);

            if (pokemonsNames !== false) {//GET request success
                pokemonsNames.forEach((pokemon) => {
                    const newText = 'Catch: ' + pokemon;
                    if (!this.isTaskExist(newText))//task already exist
                        newTaskList.push(newText);
                })
            }
            else {//GET request failed
                const newText = 'Failed to catch pokemon with this input: ' + arr;
                if (!this.isTaskExist(newText))
                    newTaskList.push(newText);
            }
        }
        else {//plain text task
            if (!this.isTaskExist(text))
                newTaskList.push(text);
        }
        this.setTaskList(newTaskList);
    }

    isTaskExist(text) {
        const taskList = this.getTaskList();
        if (taskList.indexOf(text) !== -1) {
            alert("Task already exist!\nEnter new task!");
            return true;
        }
        return false;
    }

    removeTask(text) {
        const newTaskList = [...this.getTaskList()];
        const index = newTaskList.indexOf(text);

        if (index !== -1) {//text found and index number returned
            newTaskList.splice(index, 1);
            this.setTaskList(newTaskList);
            console.log('Item removed from list');
        }
        else console.log('removeFromTaskList ERROR!');
    }

    removeAllTasks() {
        this.setTaskList([]);
    }


    getTaskList() {
        return this.taskList;
    }

    setTaskList(newTaskList) {
        this.taskList = newTaskList;
    }

    isNumbers(input) {
        return input.every((item) => {
            return !isNaN(item);
        })
    }
}

