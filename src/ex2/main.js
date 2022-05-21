// Implement the `Main` class here
class Main {
    constructor() {
        this.taskList = [];
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
            tasks[0].replaceChildren();
            while (this.taskList.length) this.taskList.pop();
            tasks[0].append(this.ChillMsg());
            this.updateFooter();
        });

        this.addChillMsg();
        this.updateFooter();
    }

    addTaskFunc() {
        const newTaskField = document.querySelectorAll('.add-task-field');
        const taskText = newTaskField[0].value;
        const tasks = document.querySelectorAll('.tasks');
        console.log(typeof (taskText));
        const validInput = this.isValidInput(taskText);
        if (validInput) {
            if (this.taskList.length === 0) tasks[0].replaceChildren();
            tasks[0].append(this.newTaskElement(taskText));
        }
        this.resetInputField(newTaskField);
        this.updateFooter();
    }

    isValidInput(taskText) {
        if (taskText == "") {
            alert("Enter new task!");
            return false;
        }
        else if (this.taskList.indexOf(taskText) !== -1) {
            alert("Task already exist!\nEnter new task!")
            return false;
        }
        return true;
    }

    newTaskElement(text) {
        this.taskList.push(text);
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
            this.removeFromTaskList(getTaskContent);
            delBtn.parentNode.parentNode.remove();
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
        this.updateFooter();
    }

    updateFooter() {
        const taskLength = this.taskList.length;
        const text = taskLength ? `You have ${taskLength} pending tasks` :
            `WooHoo!! You have no tasks pending!`;
        const footerElem = document.getElementsByClassName('footer-text')[0];
        footerElem.textContent = text;
        const clearAllBtn = document.getElementsByClassName('clear-all-btn')[0];
        clearAllBtn.disabled = taskLength ? false : true;
    }

    addChillMsg() {
        if (this.taskList.length === 0) {
            const tasks = document.querySelectorAll('.tasks');
            tasks[0].append(this.ChillMsg());
        }
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
}


const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    main.init();
});