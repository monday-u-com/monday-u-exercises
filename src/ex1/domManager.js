class DomManager {
    render(tasks) {
        const ul = document.querySelector("#list");
        ul.innerHTML = "";
        tasks.forEach((task) => {
            const li = this.createLiElement(ul, task);
            this.addDeleteBtn(li, task);
        });
        this.updateCounter(tasks);
    }

    updateCounter(tasks) {
        document.querySelector("#counter").textContent = tasks.length;
    }

    getElement(id) {
        return document.querySelector(`#${id}`);
    }

    createLiElement(ul, task) {
        const li = document.createElement("li");
        li.className = "list-item";
        li.appendChild(document.createTextNode(task));
        li.onclick = function (event) {
            event.cancelBubble = true;
            event.preventDefault();
            alert(task);
        }
        ul.appendChild(li);
        return li;
    }

    addDeleteBtn(li, task) {
        const DeleteTaskBtn = document.createElement("button");
        DeleteTaskBtn.className = "list-item-delete-button";
        DeleteTaskBtn.appendChild(document.createTextNode("\u00D7"));
        DeleteTaskBtn.onclick = function (event) {
            event.preventDefault();
            event.stopPropagation();
            itemManager.removeTask(task);
            domManager.render(itemManager.tasks);
            itemManager.handleNoTasks();
        }
        li.appendChild(DeleteTaskBtn);
        return li;
    }
}