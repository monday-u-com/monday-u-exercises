class ItemManager {
    constructor() {
        this.taskList = [];
    }

    async addTask(text) {
        //check if is int (pokemon)
        const newTaskList = [...this.getTaskList()];
        const arr = text.split(',');
        if (this.isNumbers(arr)) {
            let pokemonArray = [];
            arr.forEach((num) => pokemonArray.push(parseInt(num)));
            console.log('pokemonArray: ', pokemonArray);
            const pokemonsNames = await this.catchPokemons(pokemonArray);
            if (pokemonsNames !== false){
                text = 'Catch: ' + pokemonsNames.toString();
            }
            else{
                text = 'Pokemons with ID '+arr+' not found';
            }
        }
        console.log(text);
        newTaskList.push(text);
        this.setTaskList(newTaskList);
    }

    removeTask(text) {
        const newTaskList = [...this.getTaskList()];
        const index = newTaskList.indexOf(text);
        if (index !== -1) {
            newTaskList.splice(index, 1);
            this.setTaskList(newTaskList);
            console.log('Item removed from list');
        }
        else console.log('removeFromTaskList ERROR!');
    }

    // async catchPokemon(number) {
    //     const URL = `https://pokeapi.co/api/v2/pokemon/${number}/`;
    //     try {
    //         const response = await fetch(URL);
    //         const result = await response.json();
    //         console.log('result: ', result);
    //         return result.name;
    //     }
    //     catch (e) {
    //         console.log(number + ' not found');
    //         return false;
    //     }

    //     //API GET request
    //     //return {isPokemon:bool,names:[]} array of names
    // }

    async catchPokemons(numbers) { // numbers -> array of numbers
        const URL = `https://pokeapi.co/api/v2/pokemon/`;
        const promises = [];
        let res = [];
        numbers.map((num) => {
            promises.push(fetch(URL + num + '/'));
        })
        try {
            const response = await Promise.all(promises);
            for (const item of response) {
                res.push(await item.json());
            }
            res.forEach((el, index) => res[index] = el.name);
            console.log('pokemons: ', res);
            return res;
        }
        catch (e) {
            console.log('catch promises', e);
            return false;
        }

        //API GET request
        //return {isPokemon:bool,names:[]} array of names
    }

    async pokemonType(name) {
        const URL = `https://pokeapi.co/api/v2/type/12/`;
        try {
            const response = await fetch(URL);
            const result = await response.json();
            console.log(result);
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

const itemManager = new ItemManager();
// itemManager.catchPokemons([1, 3]);
itemManager.addTask('1,23242');
