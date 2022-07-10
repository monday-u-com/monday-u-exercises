import chalk from "chalk";
import fs from "fs";
import PokemonClient from "./PokemonClient.js";
import Image from "ascii-art-image"

const pokemonClientI = new PokemonClient();

class ItemManager {
    constructor() {
        if (fs.existsSync("./Todos.txt")) this.taskArr = JSON.parse(fs.readFileSync("./Todos.txt"));
        else this.taskArr = []
    }

    addNewTask(taskValue) {
        //check if the inputs is ID or a comma separated list of IDs
        if (/^\d+(\,\d+)+$/.test(taskValue) || /^\d*$/.test(taskValue)) {
            pokemonClientI.getPokemons(taskValue).then((pokemons) => {
                if (pokemons) {
                    console.log(chalk.green.bold("New Pokemons caught successfully"));
                    pokemons.forEach((pokemon) => {
                        this.taskArr.push(`Catch ${pokemon.name}`);
                        fs.writeFileSync("./Todos.txt", JSON.stringify(this.taskArr));
                        this.printAsciiImage(pokemon.sprites.front_default);
                    })
                } else {
                    console.log(chalk.red.bold(`faild to fetch pokemon with this input: ${taskValue}`));
                }
            })
        }

        //else input is a task
        else {
            this.taskArr.push(taskValue); //add the user value to the task array
            fs.writeFileSync("./Todos.txt", JSON.stringify(this.taskArr));
            console.log(chalk.green.bold("New todo added successfully"))
        }

    }

    removeTask(index) {
        if (this.checkIfEmpty()) return;
        else if (this.taskArr.length <= index) console.log(chalk.red.bold("No value with this index!"))
        else {
            this.taskArr.splice(index, 1);
            fs.writeFileSync("./Todos.txt", JSON.stringify(this.taskArr));
            console.log(chalk.green.bold(`Value with index:${index} was deleted successfully`))
        }
    }

    sortArr() {
        if (this.checkIfEmpty()) return;
        this.taskArr.sort();
        fs.writeFileSync("./Todos.txt", JSON.stringify(this.taskArr));
        console.log(chalk.green.bold('The list was sorted successfully'))

    }

    clearArr() {
        if (this.checkIfEmpty()) return;
        this.taskArr.length = 0;
        fs.writeFileSync("./Todos.txt", JSON.stringify(this.taskArr));
        console.log(chalk.green.bold('The list was cleard successfully'))
    }

    get() {
        if (this.checkIfEmpty()) return;
        this.taskArr.forEach((task) => {
            console.log(task)
        })
    }

    checkIfEmpty() {
        if (!this.taskArr.length) {
            console.log(chalk.black.bgRed.bold('Todo list is empty, Use "add" to add your first todo.'));
            return true;
        }
        return false;
    }

    printAsciiImage(imageUrl) {

        var image = new Image({
            filepath: imageUrl,
            alphabet: 'blocks'
        });

        image.write(function (err, rendered) {
            console.log(rendered);
        })
    }
}

export default ItemManager;