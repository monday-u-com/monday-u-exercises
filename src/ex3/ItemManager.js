import chalk from "chalk";
import fs from "fs";

class ItemManager {
    constructor() {
        if (fs.existsSync("./Todos.txt")) this.taskArr = JSON.parse(fs.readFileSync("./Todos.txt"));
        else this.taskArr = []
    }

    addNewTask(taskValue) {
        this.taskArr.push(taskValue); //add the user value to the task array
        fs.writeFileSync("./Todos.txt", JSON.stringify(this.taskArr));
    }

    removeTask(index) {
        if (this.taskArr.length === 0) console.log(chalk.black.bgBlue.bold('Todo list is empty, Use "add" to add your first todo.'));
        else if (this.taskArr.length <= index) console.log(chalk.red.bold("No value with this index!"))
        else {
            this.taskArr.splice(index, 1);
            fs.writeFileSync("./Todos.txt", JSON.stringify(this.taskArr));
            console.log(chalk.green.bold(`Value with index:${index} was deleted successfully`))
        }
    }

    sortArr() {
        this.taskArr.sort();
        fs.writeFileSync("./Todos.txt", JSON.stringify(this.taskArr));
    }

    clearArr() {
        this.taskArr.length = 0;
    }

    get() {
        this.taskArr.forEach((task) => {
            console.log(task)
        })
    }
}

export default ItemManager;