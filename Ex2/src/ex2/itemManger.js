export class ItemManager {
    clearAllTasks = () => {
        this.tasksArray = [];
    }
    constructor() {
        this.tasksArray = [];
    }
;

    removeTask = (task) => {
        const index = this.tasksArray.indexOf(task);
        if (index > -1) {
            this.tasksArray.splice(index, 1);
        }
    };

    addTask = (task) => {
        if (this.tasksArray.includes(task)) {
            alert(`Already have this ${task} task buddy!`);
        } else {
            this.tasksArray.push(task);
        }
    };
}
