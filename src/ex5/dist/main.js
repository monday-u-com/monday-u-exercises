class Main {
  constructor() {
    this.itemClient = new ItemClient();
    this.taskList = [];
  }
  init = async () => {
    const addBtn = document.querySelector(".add-task-btn");
    const addTaskField = document.querySelector(".add-task-field");
    const clearAllBtn = document.querySelector(".clear-all-btn");

    addBtn.addEventListener("click", () => {
      this.addTask();
    });

    addTaskField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.addTask();
      }
    });

    clearAllBtn.addEventListener("click", async () => {
      await this.itemClient.removeAllTasks();
      await this.renderTaskList();
    });

    await this.renderTaskList();
  };

  async addTask() {
    const newTaskField = document.querySelector(".add-task-field");
    const taskText = newTaskField.value;
    const validInput = await this._isValidInput(taskText);

    if (validInput) {
      await this.callFuncWithLoader(this.itemClient.addTask, taskText);
      await this.renderTaskList();
    }
    this.resetInputField(newTaskField);
  }

  async callFuncWithLoader(func, args) {
    const div = this._loaderElem();
    const result = await func(args);
    this._removeLoaderElem(div);
    return result;
  }

  _loaderElem() {
    const main = document.querySelector(".main");
    const div = document.createElement("div");
    div.classList.add("loader");
    main.append(div);
    return div;
  }

  _removeLoaderElem(div) {
    div.remove();
  }

  _isNumbers(input) {
    const arr = input.split(",");
    return arr.every((item) => {
      return !isNaN(item);
    });
  }

  async _isValidInput(taskText) {
    const taskList = this._getTaskList();
    if (taskText.trim() == "") {
      //handling empty string or string of spaces
      alert("Enter new task!");
      return false;
    } else if (taskList.indexOf(taskText) !== -1) {
      alert("Task already exist!\nEnter new task!");
      return false;
    }
    return true;
  }

  newTaskElement(item) {
    const text = item["ItemName"];
    const status = item["status"];
    const div = document.createElement("div");
    div.classList.add("task");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    if (status) input.checked = true;
    input.onclick = async (e) => {
      e.stopPropagation();
      await this.callFuncWithLoader(this.itemClient.updateTask, {
        ...item,
        status: e.target.checked,
      });
    };
    div.append(input);

    const h3 = document.createElement("h3");
    h3.classList.add("task-content");
    h3.setAttribute("contenteditable", "true");
    h3.textContent = text;
    div.append(h3);
    h3.onclick = (e) => {
      e.stopPropagation();
    };

    h3.addEventListener("focusout", async (e) => {
      if (e.target.innerText.trim() !== text) {
        await this.callFuncWithLoader(this.itemClient.updateTask, {
          ...item,
          ItemName: e.target.innerText.trim(),
        });
      }
    });

    const span = document.createElement("span");
    const delBtn = document.createElement("i");
    delBtn.classList.add("fa-solid");
    delBtn.classList.add("fa-trash");
    delBtn.classList.add("fa-1x");

    div.onclick = () => {
      alert(text);
    };

    delBtn.onclick = async (e) => {
      e.stopPropagation();
      const getDivParent = delBtn.closest("div");
      const getTextFromH3 =
        getDivParent.getElementsByTagName("h3")[0].textContent;
      await this.itemClient.removeTask(getTextFromH3);
      await this.renderTaskList();
    };

    span.append(delBtn);
    div.append(span);
    return div;
  }

  updateFooter(taskLength) {
    const text = taskLength
      ? `You have ${taskLength} pending tasks`
      : `WooHoo!! You have no tasks pending!`;
    const footerElem = document.getElementsByClassName("footer-text")[0];
    footerElem.textContent = text;
    const clearAllBtn = document.getElementsByClassName("clear-all-btn")[0];
    clearAllBtn.disabled = taskLength ? false : true;
  }

  ChillMsg() {
    const div = document.createElement("div");
    div.classList.add("chill");
    const i1 = document.createElement("i");
    i1.classList.add("fa", "fa-solid", "fa-martini-glass-citrus", "fa-4x");
    const i2 = document.createElement("i");
    i2.textContent = "Chill out! Nothing to do";
    div.append(i1, i2);
    return div;
  }

  resetInputField(newTaskField) {
    newTaskField.value = "";
    newTaskField.focus();
  }

  async renderTaskList() {
    const objList = await this.callFuncWithLoader(this.itemClient.getAllTasks);
    const tasks = document.querySelector(".tasks");
    const divList = [];
    if (objList.length > 0) {
      objList.forEach((item) => {
        const divTask = this.newTaskElement(item);
        divList.push(divTask);
      });
    } else {
      divList.push(this.ChillMsg());
    }
    tasks.replaceChildren();

    divList.forEach((divTask) => {
      tasks.append(divTask);
    });

    this.updateFooter(objList.length);
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
