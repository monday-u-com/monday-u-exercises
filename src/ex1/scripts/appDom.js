import { TasksManeger } from "./tasksManager.js";
import { Alert } from "./alertScripts.js";

class AppDom {
  constructor(htmlElement) {
    this.tasksManager = new TasksManeger();
    this.emprtyInputAlert = new Alert(htmlElement);
    this.taskInput = htmlElement.querySelector(".task-input");
    this.addTaskButton = htmlElement.querySelector(".task-add-btn");
    this.tasksList = htmlElement.querySelector(".tasks-list");
    this.filterOptiopn = htmlElement.querySelector(".filter-tasks");
    this.searchInput = htmlElement.querySelector(".search-input");
    this.dragArea = htmlElement.querySelector(".tasks-list");
    this.emptyListMsg = htmlElement.querySelector(".empty-msg");
    this.chosenFilter = "all";

    this.activateSortable(this.tasksManager);
    this.addFieldsEventListeners();

    this.renderTasks();
  }

  activateSortable(tasksManeger) {
    new Sortable(this.dragArea, {
      animation: 350,
      draggable: ".task",
      handle: ".grip-lines-icon",

      onEnd: function (evt) {
        const tasksList = evt.item.parentElement.querySelectorAll(".task");
        tasksManeger.reSortTasks(tasksList);
      },
    });
  }

  addFieldsEventListeners() {
    this.addTaskButton.onclick = this.onAddTaskClick.bind(this);
    this.filterOptiopn.onchange = this.onFilterOptionChange.bind(this);
    this.searchInput.onkeyup = this.onSearchInputKeyUp.bind(this);
    this.tasksList.onclick = this.onTaskButtonsClick.bind(this);

    this.taskInput.onkeypress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.onAddTaskClick();
      }
    };
  }

  onAddTaskClick(e) {
    const isOk = this.canProceed();
    if (isOk) {
      this.tasksManager.addTask(this.taskInput.value, false);
      this.taskInput.value = "";
      this.renderTasks();
    }
  }

  canProceed() {
    const isAlertOn = this.emprtyInputAlert.isAlertShown();
    if (this.taskInput.value === "") {
      if (!isAlertOn) {
        this.emprtyInputAlert.toggleAlert();
      }
      return false;
    } else {
      if (isAlertOn) {
        this.emprtyInputAlert.toggleAlert();
      }
      return true;
    }
  }

  createGridLines() {
    const gripLines = document.createElement("div");
    gripLines.classList.add("grip-lines-icon");
    gripLines.innerHTML = '<i class="fas fa-grip-lines"></i>';
    return gripLines;
  }

  createTaskContent(content = null) {
    const newTask = document.createElement("p");
    newTask.classList.add("task-item");
    if (content) {
      newTask.innerText = content;
    } else {
      newTask.innerText = this.taskInput.value;
    }
    return newTask;
  }

  createCompleteBtn(isCompleted = false) {
    const completeTaskButton = document.createElement("button");
    completeTaskButton.classList.add("task-complete-btn");
    completeTaskButton.classList.add("hide");
    if (isCompleted) {
      completeTaskButton.classList.add("btn-completed");
    }
    completeTaskButton.innerHTML = '<i class="fas fa-check"></i>';
    return completeTaskButton;
  }

  createRemoveBtn() {
    const removeTaskButton = document.createElement("button");
    removeTaskButton.classList.add("task-remove-btn");
    removeTaskButton.classList.add("hide");
    removeTaskButton.innerHTML = '<i class="fas fa-trash"></i>';
    return removeTaskButton;
  }

  addTaskDivEventListeners(taskDiv) {
    taskDiv.addEventListener("click", this.onTaskClick);
    taskDiv.addEventListener("mouseover", this.onTaskMouseOver);
    taskDiv.addEventListener("mouseleave", this.onTaskMouseOut);
    taskDiv.draggable = true;
  }

  onTaskButtonsClick(e) {
    console.log("HERE");
    const button = e.target;
    if (button.classList.contains("task-complete-btn")) {
      button.parentElement.classList.toggle("task-completed");
      button.classList.toggle("btn-completed");
      this.tasksManager.toggleCompleted(
        button.parentElement.querySelector(".task-item").innerText
      );
    } else if (e.target.classList.contains("task-remove-btn")) {
      const task = e.target.parentElement;
      task.ontransitionend = this.onRemoveTransitionEnd.bind(this);
      task.classList.add("task-removed");
    }
  }

  onRemoveTransitionEnd(e) {
    this.tasksManager.removeTask(
      e.target.querySelector(".task-item").innerText
    );
    this.renderTasks();
  }

  onFilterOptionChange(e) {
    this.chosenFilter = e.target.value;
    this.renderTasks();
  }

  toggleEmptyMsg() {
    if (this.tasksManager.isEmpty() === true) {
      this.emptyListMsg.classList.remove("hide");
    } else {
      this.emptyListMsg.classList.add("hide");
    }
  }

  onSearchInputKeyUp(e) {
    this.renderTasks();
  }

  onTaskClick(e) {
    if (e.target.classList.contains("task")) {
      alert(e.target.innerText);
    }
  }

  onTaskMouseOver(e) {
    const completeTaskButton = e.target.querySelector(".task-complete-btn");
    //because sometime the hover is on p and button is not the event
    if (completeTaskButton != null) {
      completeTaskButton.classList.remove("hide");
      const removeTaskButton = e.target.querySelector(".task-remove-btn");
      removeTaskButton.classList.remove("hide");
    }
  }

  onTaskMouseOut(e) {
    const completeTaskButton = e.target.querySelector(".task-complete-btn");
    completeTaskButton.classList.add("hide");
    const removeTaskButton = e.target.querySelector(".task-remove-btn");
    removeTaskButton.classList.add("hide");
  }

  createTaskDiv(task, isCompleted) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    if (isCompleted) {
      taskDiv.classList.add("task-completed");
    }
    taskDiv.appendChild(this.createGridLines());
    taskDiv.appendChild(this.createTaskContent(task));
    taskDiv.appendChild(this.createCompleteBtn(isCompleted));
    taskDiv.appendChild(this.createRemoveBtn());
    return taskDiv;
  }

  filterCompleteTasks(tasks) {
    console.log("filter", tasks);
    switch (this.chosenFilter) {
      case "all":
        return tasks;
      case "completed":
        return tasks.filter((task) => {
          task[1] === true;
        });
      case "uncompleted":
        return tasks.filter((task) => task[1] === false);
      default:
        return tasks;
    }
  }

  filterSearchedTasks(tasks) {
    const searchInput = this.searchInput.value;
    if (searchInput === "") {
      return tasks;
    } else {
      return tasks.filter((task) => {
        return task[0].toLowerCase().includes(searchInput.toLowerCase());
      });
    }
  }

  renderTasks() {
    this.tasksList.innerHTML = "";
    const tasks = [...this.tasksManager.getTasks()];
    const completeFilter = this.filterCompleteTasks(tasks);
    const filteredTasks = this.filterSearchedTasks(completeFilter);
    const self = this;
    this.toggleEmptyMsg();
    filteredTasks.forEach(function (task) {
      const taskDiv = self.createTaskDiv(task[0], task[1]);
      self.tasksList.appendChild(taskDiv);
      self.addTaskDivEventListeners(taskDiv);
    });
  }
}

const app = new AppDom(document);
