import { ItemManager } from './ItemManager.js';
import getPokemon from './PokemonClient.js';


export class Tasks {

    constructor() {
        let self = this;
        this.items = new ItemManager()

        document.addEventListener('keydown', function (key) {
            if (key.code === "Enter") {
                self.addTask()
            }
        })
        this.taskContainer = document.getElementById("task-container");
    }

    async addTask() {
        this.taskContainer.classList.remove("empty-list")

        if (!document.getElementById("new-task-input").value.length) {
            alert("Please input a value")
            return
        }

        let newTaskText = document.getElementById("new-task-input").value

        /*-----------------------List of pokemons----------------------------*/

        if (newTaskText.includes(",") && JSON.stringify(newTaskText.split(",")) === JSON.stringify(newTaskText.split(",").filter(item => !isNaN(item)))) {
            const listOfItems = newTaskText.split(",")
            let listOfPromises = []
            for (let i = 0; i < listOfItems.length; i++) {
                listOfPromises.push(getPokemon(listOfItems[i]))
            }

            Promise.all(listOfPromises).then(items => {
                items.forEach(item => {
                    newTaskText = `Catch ${item.forms[0].name} the ${item.types[0].type.name} pokemon`
                    if (item === 0) {
                        newTaskText = `No such pokemon exists :(`
                    }
                    else if (this.checkIfPokemonExists(newTaskText)) {
                        alert("Pokemon already exists")
                        return
                    } else {
                        addTaskNode(newTaskText)
                    }
                })
            })
        }

        /*--------------------------A single pokemon-----------------------*/

        else if (!isNaN(newTaskText)) {
            const pokemonName = await getPokemon(newTaskText)
            console.log(pokemonName)
            newTaskText = `Catch ${pokemonName.forms[0].name} the ${pokemonName.types[0].type.name} pokemon`
            if (pokemonName === 0) {
                newTaskText = `No such pokemon exists :(`
            }
            else if (this.checkIfPokemonExists(newTaskText)) {
                alert("Pokemon already exists")
                return
            }
            addTaskNode(newTaskText)
        }

        /*----------------------Normal text------------------------*/

        else {
            const newTextDiv = document.createTextNode(newTaskText); //Text
            this.addTaskNode(newTextDiv)
        }
        document.getElementById("bottom-text").innerText = `You have ${this.taskContainer.children.length} tasks`
    }

    addTaskNode(text) {
        const newTextDiv = document.createTextNode(text); //Text
        const newTaskDiv = document.createElement("div"); //Task
        const newTaskDivContainer = document.createElement("div"); //Task Container
        const deleteButton = document.createElement("button"); //Button
        deleteButton.classList.add("delete-button")
        deleteButton.addEventListener("click", () => {
            this.items.remove(newTaskDivContainer)
            while (this.taskContainer.children.length) {
                this.taskContainer.children[0].remove()
            }
            for (let i = 0; i < this.items.items.length; i++) {
                this.taskContainer.appendChild(this.items.items[i])
            }
            if (!this.items.items.length) {
                this.taskContainer.classList.add("empty-list")
            }
            document.getElementById("bottom-text").innerText = `You have ${this.taskContainer.children.length} tasks`
        })
        newTaskDiv.appendChild(newTextDiv);
        newTaskDiv.addEventListener("click", () => alert(newTaskDiv.innerHTML))
        newTaskDiv.classList.add("task")
        newTaskDivContainer.classList.add("new-task-div-container")
        newTaskDivContainer.appendChild(newTaskDiv)
        newTaskDivContainer.appendChild(deleteButton)
        this.items.add(newTaskDivContainer)

        document.getElementById("new-task-input").value = ""
        this.removeItems()
        this.loadItems()
    }

    sort() {
        const nodes = this.taskContainer.children
        var elements = [].slice.call(nodes);
        elements.sort(function (a, b) {
            return a.textContent.localeCompare(b.textContent);
        }).forEach(function (val, index,) {
            document.getElementById("task-container").appendChild(val);
        });
    }
    clearAll() {
        this.items.items = []
        while (this.taskContainer.children.length) {
            this.taskContainer.children[0].remove()
        }
        this.taskContainer.classList.add("empty-list")
        document.getElementById("bottom-text").innerText = `You have no tasks`
    }
    loadItems() {
        for (let i = 0; i < this.items.items.length; i++) {
            this.taskContainer.appendChild(this.items.items[i])
        }
    }
    removeItems() {
        while (this.taskContainer.children.length) {
            this.taskContainer.children[0].remove()
        }
    }
    checkIfPokemonExists(pokemon) {
        for (let i = 0; i < this.taskContainer.children.length; i++) {
            if (this.taskContainer.children[i].innerText === pokemon) {
                return true
            }
        }
        return false
    }
};