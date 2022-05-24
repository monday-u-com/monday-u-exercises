import { TasksManeger } from "./tasksManager.js";
import { EmptyAlert } from "./alertScripts.js";

class AppDom {
  constructor() {
    this.tasksManager = new TasksManeger();
    this.emptyAlert = new EmptyAlert();
    this.taskInput = document.querySelector(".task-input");
    this.addTaskButton = document.querySelector(".task-add-btn");
    this.tasksList = document.querySelector(".tasks-list");
    this.filterOptiopn = document.querySelector(".filter-tasks");
    this.searchInput = document.querySelector(".search-input");
    this.dragArea = document.querySelector(".tasks-list");
    this.chosenFilter = "all";

    new Sortable(this.dragArea, {
      animation: 350,
      draggable: ".task",
      handle: ".grip-lines-icon",
      onEnd: function (evt) {
        const tasks = evt.item.parentElement;
        this.tasksManager.updateTaskOrder(tasks);
      },
    });
    this.addFieldsEventListeners();

    this.renderTasks();
  }

  addFieldsEventListeners() {
    this.addTaskButton.onClick = this.onAddTaskClick.bind(this);
    this.filterOptiopn.onChange = this.onFilterOptionChange.bind(this);
    this.searchInput.onKeyUp = this.onSearchInputKeyUp.bind(this);
    this.tasksList.onClick = this.onTaskButtonsClick.bind(this);

    this.taskInput.onkeypress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.onAddTaskClick();
      }
    };
    /*
    this.taskInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        this.addTaskButton.click();
      }
    })*/
  }

  onAddTaskClick(e) {
    const isOk = this.canProceed();
    if (isOk) {
      this.tasksManager.addTask(this.taskInput.value, false);
      this.renderTasks();
    }
  }

  canProceed() {
    const isAlertOn = this.emptyAlert.isAlertShown();
    if (this.taskInput.value === "") {
      if (!isAlertOn) {
        this.emptyAlert.toggleAlert();
      }
      return false;
    } else {
      if (isAlertOn) {
        this.emptyAlert.toggleAlert();
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
    const button = e.target;
    if (button.classList.contains("task-complete-btn")) {
      button.parentElement.classList.toggle("task-completed");
      button.classList.toggle("btn-completed");
      updateTaskInLocalStorage(
        button.parentElement.querySelector(".task-item").innerText
      );
    } else if (e.target.classList.contains("task-remove-btn")) {
      const task = e.target.parentElement;
      task.addEventListener("transitionend", this.onRemoveTransitionEnd, false);
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
    console.log("filter changed");
    this.chosenFilter = e.target.value;
    this.renderTasks();
  }

  toggleEmptyMsg() {
    const emptyMsg = document.querySelector(".empty-msg");
    if (this.tasksList.children.length === 0) {
      emptyMsg.classList.remove("hide");
    } else {
      emptyMsg.classList.add("hide");
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

  filterTasks(tasks) {
    switch (this.chosenFilter) {
      case "all":
        return tasks;
      case "completed":
        return tasks.filter((task) => task.isCompleted);
      case "uncompleted":
        return tasks.filter((task) => !task.isCompleted);
      default:
        return tasks;
    }
  }

  renderTasks() {
    this.tasksList.innerHTML = "";
    const tasks = [...this.tasksManager.getTasks()];
    const filteredTask = this.filterTasks(tasks);
    const self = this;
    if (filteredTask.length === 0) {
      this.toggleEmptyMsg();
    } else {
      filteredTask.forEach(function (task) {
        const taskDiv = self.createTaskDiv(task[0], task[1]);
        self.tasksList.appendChild(taskDiv);
        self.addTaskDivEventListeners(taskDiv);
      });
    }
  }
}
  