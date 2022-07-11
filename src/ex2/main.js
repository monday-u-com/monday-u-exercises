// Implement the `Main` class here
class Main {
    constructor() {
        this.itemManager = new ItemManager();
    }

    init = () => {
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

        clearAllBtn.addEventListener('click', () => {
            this.itemManager.removeAllTasks();
            this.renderTaskList(this.itemManager._getTaskList());
        });
        const taskList = this.itemManager._getTaskList();
        this.renderTaskList(taskList);
    }

    async addTask() {
        const newTaskField = document.querySelector('.add-task-field');
        const taskText = newTaskField.value;
        const validInput = this._isValidInput(taskText);

        if (validInput) {
            if (this._isNumbers(taskText)) {
                await this.itemManager.addCatchPokemonTask(taskText.split(','));
            }
            else {
                this.itemManager.addPlainTextTask(taskText);
            }
            this.renderTaskList(this.itemManager._getTaskList());
        }
        this.resetInputField(newTaskField);
    }

    _isNumbers(input) {
        const arr = input.split(',');
        return arr.every((item) => {
            return !isNaN(item);
        })
    }

    _isValidInput(taskText) {
        const taskList = this.itemManager._getTaskList();
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

        delBtn.onclick = (e) => {
            e.stopPropagation();
            const getDivParent = delBtn.closest("div");
            const getTextFromH3 = getDivParent.getElementsByTagName("h3")[0].textContent;
            this.itemManager.removeTask(getTextFromH3);
            this.renderTaskList(this.itemManager._getTaskList());
        }


        span.append(delBtn)
        div.append(span);
        return div;
    }

    removeFromTaskList(text) {
        const index = this.taskList.indexOf(text);
        if (index !== -1) {
            this.taskList.splice(index, 1);
            console.log('Item removed from list');
        }
        else console.log('removeFromTaskList ERROR!');
        this.addChillMsg();
        this.updateFooter(this.taskList.length);
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

    renderTaskList(newTaskList) {
        const tasks = document.querySelector('.tasks');
        const divList = [];
        if (newTaskList.length > 0) {
            newTaskList.forEach((task) => {
                const divTask = this.newTaskElement(task);
                divList.push(divTask);
            })
        }
        else {
            divList.push(this.ChillMsg());
        }
        console.log(divList);
        tasks.replaceChildren();
        divList.forEach((divTask) => {
            tasks.append(divTask);
        })
        this.updateFooter(newTaskList.length);
    }
}


const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    main.init();
});