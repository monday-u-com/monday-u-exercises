class ItemManager {
    constructor() {
        this.taskArr = JSON.parse(localStorage.getItem("tasks")) || [];
    }

    addNewTask(taskValue) {
        this.taskArr.push(taskValue); //add the user value to the task array
        localStorage.setItem("tasks", JSON.stringify(this.taskArr));//add the updated task array to the localStorage
    }

    removeTask(taskValue) {
        this.taskArr.splice(this.taskArr.indexOf(taskValue), 1);
        localStorage.setItem("tasks", JSON.stringify(this.taskArr)); //add the updated task array to the localStorage
    }

    sortArr() {
        this.taskArr.sort();
        localStorage.setItem("tasks", JSON.stringify(this.taskArr)); //add the updated task array to the localStorage
    }

    clearArr() {
        this.taskArr.length = 0;
        localStorage.setItem("tasks", JSON.stringify(this.taskArr)); //add the updated task array to the localStorage
    }
}
