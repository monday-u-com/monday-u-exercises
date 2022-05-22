class ItemManager {
    constructor() {
        this.taskList = [];
    }

    async addTask(text) {
        //check if is int (pokemon)
        const newTaskList = [...this.getTaskList()];
        const arr = text.split(',');

        if (this.isNumbers(arr)) {//check if input is array of number(s)
            let pokemonArray = [];
            arr.forEach((num) => pokemonArray.push(parseInt(num)));
            const pokemonsNames = await this.catchPokemons(pokemonArray);

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
        console.log('addTask: '+newTaskList);
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



    async catchPokemons(numbers) { // numbers -> array of numbers
        const URL = `https://pokeapi.co/api/v2/pokemon/`;
        const promises = [];
        let res = [];
        numbers.map((num) => {
            promises.push(fetch(URL + num + '/'));
        })
        try {
            const response = await Promise.all(promises);
            for (const item of response) {//resolve each promise
                res.push(await item.json());
            }
            res.forEach((el, index) => res[index] = el.name);
            console.log('fetched pokemons: ', res);
            return res;
        }
        catch (e) {//Promise.all failed
            console.log('Catch Error: ', e);
            return false;
        }

    }

    async pokemonType(number) {
        const URL = `https://pokeapi.co/api/v2/type/${number}/`;
        try {
            const response = await fetch(URL);
            const result = await response.json();
            return result.name;
        }
        catch (e) {
            console.log(number + ' not found');
            return false;
        }
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

// const itemManager = new ItemManager();


// itemManager.catchPokemons([1, 3]);

// itemManager.addTask('asdf');

// setTimeout(() => {
//     itemManager.addTask('1,24, 65');
// }, 1000)

// // itemManager.addTask('1,24, 652342');
// setTimeout(() => {
//     itemManager.addTask('1,24, 652342');
// }, 2000)

// setTimeout(() => {
//     itemManager.addTask('3,24');
// }, 2500)

// setTimeout(() => {
//     console.log(itemManager.getTaskList());
// }, 3000)


