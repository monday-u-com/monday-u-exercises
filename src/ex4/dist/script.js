class Main {
    constructor() {
        this.itemClient = new ItemClient()
    }

    async init() {
        const addBtn = document.querySelector(" #addBtn ");
        const taskInput = document.querySelector(" #taskInput ");
        const clearAllBtn = document.querySelector(" #clearAllBtn ");

        addBtn.addEventListener("click", () => { this.handleItem(taskInput.value, taskInput, addBtn); })

        taskInput.addEventListener("keypress", (e) => {
            if (e.key === 'Enter' && taskInput.value) this.handleItem(taskInput.value, taskInput, addBtn)
        });

        taskInput.addEventListener('keyup', () => addBtn.disabled = !taskInput.value)

        clearAllBtn.addEventListener("click", () => { this.deleteAllItems() })

        await this.renderItems();
    }

    async handleItem(value, taskInput, addBtn) {
        taskInput.value = "";
        addBtn.disabled = true;
        await this.itemClient.setTodo(value)
        await this.renderItems();
    }

    async deleteItem(item) {
        await this.itemClient.deleteTodo(item)
        await this.renderItems();
    }

    async deleteAllItems() {
        await this.itemClient.deleteAll();
        await this.renderItems();
    }

    async renderItems() {
        const taskList = document.querySelector(" #taskList ");
        taskList.innerHTML = "";

        const items = await this.itemClient.getTodos()
        this.updateForm(items.length);

        items.forEach((item) => {
            taskList.appendChild(this.createDOMTask(item));
        });
    }

    updateForm(itemsLength) {
        const pedingTaskText = document.querySelector(" #peding-task-text ");
        const clearAllBtn = document.querySelector(" #clearAllBtn ");
        const placeHolder = document.querySelector(" .placeHolder ");

        pedingTaskText.innerHTML = "You have " + itemsLength + " pending tasks"
        if (itemsLength === 0) {
            clearAllBtn.disabled = true;
            placeHolder.classList.remove("hidden");
        }
        else {
            clearAllBtn.disabled = false;
            placeHolder.classList.add("hidden");
        }
    }

    createDOMTask(taskValue) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const i = document.createElement("i");
        li.innerHTML = taskValue.value;
        i.classList.add("fa", "fa-trash-o");
        span.appendChild(i);
        li.appendChild(span);
        span.onclick = (e) => {
            e.stopPropagation();
            this.deleteItem(taskValue.value);
        };
        li.onclick = () => alert(taskValue.value);
        li.classList.add('new-li');
        return li;
    }
};

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    main.init();
});