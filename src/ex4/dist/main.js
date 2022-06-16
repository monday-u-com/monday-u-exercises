class Main {
    constructor() {
        this.itemClient = new ItemClient();
        this.taskList = [];
    }
    init = async () => {
        const addBtn = document.querySelector('.add-task-btn');
        const addTaskField = document.querySelector('.add-task-field');
        const clearAllBtn = document.querySelector('.clear-all-btn');

        addBtn.addEventListener('click', () => {
            this.addTask();
        });

        addTaskField.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.addTask();
            }
        });

        clearAllBtn.addEventListener('click', async () => {
            await this.itemClient.removeAllTasks();
            await this.renderTaskList();
        });

        await this.renderTaskList();
    }

    async addTask() {
        const newTaskField = document.querySelector('.add-task-field');
        const taskText = newTaskField.value;
        const taskList = this._getTaskList();
        const validInput = await this._isValidInput(taskText, taskList);

        if (validInput) {
            await this.itemClient.addTask(taskText);
            await this.renderTaskList();
        }
        this.resetInputField(newTaskField);
    }

    _isNumbers(input) {
        const arr = input.split(',');
        return arr.every((item) => {
            return !isNaN(item);
        })
    }

    async _isValidInput(taskText, taskList) {
        if (taskText.trim() == "") {//handling empty string or string of spaces
            alert("Enter new task!");
            return false;
        }
        else if (taskList.indexOf(taskText) !== -1) {
            alert("Task already exist!\nEnter new task!")
            return false;
        }
        return true;
    }

    newTaskElement(text) {
        const div = document.createElement('div');
        div.classList.add('task');
        const h3 = document.createElement('h3');
        h3.classList.add('task-content');
        h3.textContent = text;
        div.append(h3);
        const span = document.createElement('span');
        const delBtn = document.createElement('i');
        delBtn.classList.add('fa-solid');
        delBtn.classList.add('fa-trash');
        delBtn.classList.add('fa-1x');

        div.onclick = () => {
            alert(text);
        }

        delBtn.onclick = async (e) => {
            e.stopPropagation();
            const taskList = this._getTaskList();
            const getDivParent = delBtn.closest("div");
            const getTextFromH3 = getDivParent.getElementsByTagName("h3")[0].textContent;
            const index = taskList.indexOf(getTextFromH3);
            await this.itemClient.removeTask(index);
            await this.renderTaskList();
        }

        span.append(delBtn)
        div.append(span);
        return div;
    }


    updateFooter(taskLength) {
        const text = taskLength ? `You have ${taskLength} pending tasks` :
            `WooHoo!! You have no tasks pending!`;
        const footerElem = document.getElementsByClassName('footer-text')[0];
        footerElem.textContent = text;
        const clearAllBtn = document.getElementsByClassName('clear-all-btn')[0];
        clearAllBtn.disabled = taskLength ? false : true;
    }

    ChillMsg() {
        const div = document.createElement('div');
        div.classList.add('chill');
        const i1 = document.createElement('i');
        i1.classList.add('fa', 'fa-solid', 'fa-martini-glass-citrus', 'fa-4x');
        const i2 = document.createElement('i');
        i2.textContent = 'Chill out! Nothing to do';
        div.append(i1, i2);
        return div;
    }

    resetInputField(newTaskField) {
        newTaskField.value = "";
        newTaskField.focus();
    }

    async renderTaskList() {
        const taskList = await this.itemClient.getAllTasks();
        this._setTaskList(taskList);
        const tasks = document.querySelector('.tasks');
        const divList = [];
        if (taskList.length > 0) {
            taskList.forEach((task) => {
                const divTask = this.newTaskElement(task);
                divList.push(divTask);
            })
        }
        else {
            divList.push(this.ChillMsg());
        }
        tasks.replaceChildren();
        divList.forEach((divTask) => {
            tasks.append(divTask);
        })
        this.updateFooter(taskList.length);
    }

    _setTaskList(list) {
        this.taskList = list;
    }

    _getTaskList() {
        return this.taskList;
    }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    main.init();
});