export class TasksManeger {
    constructor() {
        this.tasks = [];
        if (localStorage.getItem("tasks") !== null) {
            this.tasks = JSON.parse(localStorage.getItem("tasks"));
        }
    }

    addTask(task, isCompleted) {
        this.tasks.push([task, isCompleted]);
        this.saveTasksToLocalStorage();
    }

    removeTask(taskContent) {
        this.tasks.forEach(function (task, index) {
            if (task[0] === taskContent) {
                this.tasks.splice(index, 1);
            }
        });
        this.saveTasksToLocalStorage();
    }

    toggleCompleted(taskContent) {
        this.tasks.forEach(function (task, index) {
            if (task[0] === taskContent) {
                this.tasks[index][1] = !this.tasks[index][1];
            }
        });
    }

    getTasks() {
        return this.tasks;
    }

    saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    reSortTasks(tasks)
    {
        this.tasks = [];
        for (let i = 0; i < tasks.length; i++) {
          tasks.push([
            tasks[i].innerText,
            tasks[i].classList.contains("task-completed"),
          ]);
        }
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
    }

}

