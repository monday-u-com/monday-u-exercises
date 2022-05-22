// Implement the `Main` class here
class Main {
    constructor() {
        this.itemManager = new ItemManager();
    }

    init = () => {
        const addBtn = document.querySelectorAll('.add-task-btn');
        const addTaskField = document.querySelectorAll('.add-task-field');
        const clearAllBtn = document.querySelectorAll('.clear-all-btn');


        addBtn[0].addEventListener('click', () => {
            this.addTaskFunc();
        });

        addTaskField[0].addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.addTaskFunc();
            }
        });

        clearAllBtn[0].addEventListener('click', () => {
            const tasks = document.querySelectorAll('.tasks');
            this.itemManager.removeAllTasks();
            this.renderTaskList(this.itemManager.getTaskList());
        });
        const taskList = this.itemManager.getTaskList();
        this.renderTaskList(taskList);
    }

    async addTaskFunc() {
        const newTaskField = document.querySelectorAll('.add-task-field');
        const taskText = newTaskField[0].value;
        const tasks = document.querySelectorAll('.tasks');
        const validInput = this.isValidInput(taskText);

        if (validInput) {
            await this.itemManager.addTask(taskText);
            this.renderTaskList(this.itemManager.getTaskList());
        }
        this.resetInputField(newTaskField);
    }

    isValidInput(taskText) {
        const taskList = this.itemManager.getTaskList();
        if (taskText.trim() == "") {
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


        delBtn.onclick = () => {
            const getTaskContent = delBtn.parentNode.parentNode.getElementsByTagName('h3')[0].textContent;
            this.itemManager.removeTask(getTaskContent);
            this.renderTaskList(this.itemManager.getTaskList());
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
        i1.classList.add('fa');
        i1.classList.add('fa-solid');
        i1.classList.add('fa-martini-glass-citrus');
        i1.classList.add('fa-4x');
        const i2 = document.createElement('i');
        i2.textContent = 'Chill out! Nothing to do';
        div.append(i1);
        div.append(i2);
        return div;

    }

    resetInputField(newTaskField) {
        newTaskField[0].value = "";
        newTaskField[0].focus();
    }

    renderTaskList(newTaskList) {
        const tasks = document.querySelectorAll('.tasks');
        const taskList = this.itemManager.getTaskList();
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
        tasks[0].replaceChildren();
        divList.forEach((divTask) => {
            tasks[0].append(divTask);
        })
        this.updateFooter(taskList.length);
    }
}


const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    main.init();
});