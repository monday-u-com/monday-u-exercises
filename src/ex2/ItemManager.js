class ItemManager {
    constructor() {
        this.taskArr = JSON.parse(localStorage.getItem("tasks")) || [];
    }

    addNewTask(taskValue) {
        this.taskArr.push(taskValue); //add the user value to the task array
        this.updateLocalStorage(this.taskArr);
    }

    removeTask(taskValue) {
        this.taskArr = this.taskArr.filter(task => task !== taskValue);
        this.updateLocalStorage(this.taskArr);
    }

    sortArr() {
        this.taskArr.sort();
        this.updateLocalStorage(this.taskArr);
    }

    clearArr() {
        this.taskArr.length = 0;
        this.updateLocalStorage(this.taskArr);
    }

    updateLocalStorage(valueToUpdate) {
        localStorage.setItem("tasks", JSON.stringify(valueToUpdate)); //add the updated task array to the localStorage
    }
}
