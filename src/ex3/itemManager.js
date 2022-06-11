import { PokemonClient } from "./pokemonClient.js";
import fs from "fs";
const TXT_FILE = "mytodolist.txt"

export class ItemManager {
    constructor() {
        this.taskList = this._updateListFromFile();
        this.pokemonClient = new PokemonClient();
    }

    async addCatchPokemonTask(IDs) {
        const newTaskList = [...this._getTaskList()];
        const pClient = this.pokemonClient;
        IDs.map((num) => parseInt(num));
        try {
            const pokemonsRawJson = await pClient.catchPokemons(IDs);
            pokemonsRawJson.forEach((pokemonJson) => {
                const pokemon = pokemonJson.name;
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
        this._setTaskList(newTaskList);
    }

    addPlainTextTask(text) {
        const newTaskList = [...this._getTaskList()];
        if (!this._isTaskExist(text)) {
            newTaskList.push(text);
            this._setTaskList(newTaskList);
            console.log("New todo added successfully");
        }
    }

    _isTaskExist(text) {
        const taskList = this._getTaskList();
        if (taskList.indexOf(text) !== -1) {
            console.log(`Task '${text}' already exist!`);
            return true;
        }
        return false;
    }

    removeTask(text) {
        const newTaskList = [...this._getTaskList()];
        const index = newTaskList.indexOf(text);
        if (index !== -1) { //text found and index number returned
            newTaskList.splice(index, 1);
            this._setTaskList(newTaskList);
            console.log('Todo deleted successfully');
        }
        else console.log('Delete from task list ERROR!');
    }

    removeAllTasks() {
        this._setTaskList([]);
        console.log('All todo list deleted successfully');
    }

    _getTaskList() {
        return this.taskList;
    }

    _setTaskList(newTaskList) {
        if (newTaskList[0] === '') { //handling adding task to empty file
            newTaskList.splice(0, 1);
        }
        this.taskList = newTaskList;
        this._writeToFile(this.taskList);
    }

    _writeToFile(newList) {
        fs.writeFileSync(TXT_FILE, newList.join("\n"));
    }

    _updateListFromFile() {
        let data = [];
        try{
            data = fs.readFileSync(TXT_FILE, 'utf-8');
            data = data.split("\n");
        }
        catch{
            fs.writeFileSync(TXT_FILE,'');                
        }
        return data;
    }
}


