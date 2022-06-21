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

    async deleteItem(id) {
        await this.itemClient.deleteTodo(id)
        await this.renderItems();
    }

    async deleteAllItems() {
        await this.itemClient.deleteAll();
        await this.renderItems();
    }

    async updateStatus(id, status) {
        await this.itemClient.updateStatus(id, status);
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

    createDOMTask(item) {
        const li = document.createElement("li");
        const checkBox = document.createElement("INPUT");
        const span = document.createElement("span");
        const i = document.createElement("i");
        li.innerHTML = item.itemName;
        checkBox.setAttribute("type", "checkbox");
        checkBox.classList.add("checkbox");
        checkBox.checked = item.status;
        li.appendChild(checkBox);
        i.classList.add("fa", "fa-trash-o");
        span.appendChild(i);
        li.appendChild(span);
        span.onclick = (e) => {
            e.stopPropagation();
            this.deleteItem(item.id);
        };
        checkBox.onclick = (e) => {
            e.stopPropagation();
            this.updateStatus(item.id, checkBox.checked);
        }
        li.onclick = () => alert(item.itemName);
        li.classList.add('new-li');
        return li;
    }
};

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    main.init();
});