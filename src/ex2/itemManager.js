class ItemManager {
    constructor() {
        this.taskList = [];
    }

    

    getTaskList() {
        return this.taskList;
    }

    setTaskList(newTaskList) {
        this.taskList = newTaskList;
    }
}