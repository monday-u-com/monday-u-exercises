import { TasksManeger } from "./tasksManager.js";
import { Alert } from "./alertScripts.js";
import {
  TASK_ID,
  TASK_CONTENT,
  TASK_COMPLETED,
  EMPTY_INPUT_MSG,
} from "./globalConsts.js";

class AppDom {
  constructor(htmlElement) {
    this.tasksManager = new TasksManeger();
    this.emprtyInputAlert = new Alert(htmlElement);
    this.taskInput = htmlElement.querySelector(".task-input");
    this.addTaskButton = htmlElement.getElementById("task-add-btn");
    this.tasksList = htmlElement.querySelector(".tasks-list");
    this.filterOption = htmlElement.getElementById("filter-dropdown");
    this.searchInput = htmlElement.getElementById("search-input");
    this.dragArea = htmlElement.querySelector(".tasks-list");
    this.emptyListMsg = htmlElement.getElementById("empty-tasks");
    this.removeAllTasksButton = htmlElement.getElementById("remove-all-btn");
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
    this.filterOption.onchange = this.onFilterOptionChange.bind(this);
    this.searchInput.onkeyup = this.onSearchInputKeyUp.bind(this);
    this.removeAllTasksButton.onclick = this.onRemoveAllTasksClick.bind(this);

    this.taskInput.onkeyup = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.onAddTaskClick();
      }
    };
  }

  async onAddTaskClick(e) {
    const isOk = this.canProceed();

    const isAlertShown = this.emprtyInputAlert.isAlertShown();
    if (!isOk && !isAlertShown) {
      this.emprtyInputAlert.toggleAlert(EMPTY_INPUT_MSG);
    }

    if (isOk) {
      const isTaskAdded = await this.tasksManager.addTask(
        this.taskInput.value,
        false
      );
      if (isTaskAdded) {
        if (isAlertShown) {
          this.emprtyInputAlert.toggleAlert(EMPTY_INPUT_MSG); //if added and alert shown - close it
        }
        this.renderTasks();
      }
      //else - alert exists, or other error do nothing for now, but later we can add some error alert handling
    }
    this.taskInput.value = "";
  }

  canProceed() {
    return this.taskInput.value.trim() !== "";
  }

  createGridLines() {
    const gripLines = document.createElement("div");
    gripLines.classList.add("grip-lines-icon");
    const gripLinesIcon = document.createElement("i");
    gripLinesIcon.classList.add("fas");
    gripLinesIcon.classList.add("fa-grip-lines");
    gripLines.appendChild(gripLinesIcon);
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
    const icon = document.createElement("i");
    icon.classList.add("fas");
    icon.classList.add("fa-check");
    completeTaskButton.appendChild(icon);
    completeTaskButton.setAttribute("id", "complete-task-btn");
    completeTaskButton.onclick = this.onCompleteBtnClick.bind(this);
    return completeTaskButton;
  }

  onCompleteBtnClick(e) {
    e.target.classList.toggle("btn-completed");
    const taskItem = e.target.parentElement;
    taskItem.classList.toggle("task-completed");
    const taskId = taskItem.getAttribute("id");
    this.tasksManager.toggleCompleted(parseInt(taskId));
    this.renderTasks();
  }

  createRemoveBtn() {
    const removeTaskButton = document.createElement("button");
    removeTaskButton.classList.add("task-remove-btn");
    removeTaskButton.classList.add("hide");
    const icon = document.createElement("i");
    icon.classList.add("fas");
    icon.classList.add("fa-trash-alt");
    removeTaskButton.appendChild(icon);
    removeTaskButton.setAttribute("id", "remove-task-btn");
    removeTaskButton.onclick = this.onRemoveBtnClick.bind(this);
    return removeTaskButton;
  }

  onRemoveBtnClick(e) {
    const taskItem = e.target.parentElement.parentElement;
    //taskItem.ontransitionend = this.onRemoveTransitionEnd.bind(this);
    //taskItem.classList.add("remove-task");
    const taskId = taskItem.getAttribute("id");
    this.tasksManager.removeTask(parseInt(taskId));
    this.renderTasks();
  }

  onRemoveAllTasksClick(e) {
    this.tasksManager.removeAllTasks();
    this.renderTasks();
  }

  addTaskDivEventListeners(taskDiv) {
    taskDiv.onmouseover = this.onTaskMouseOver.bind(this);
    taskDiv.onmouseleave = this.onTaskMouseOut.bind(this);
    taskDiv.addEventListener("click", this.onTaskClick);
    taskDiv.draggable = true;
  }

  onRemoveTransitionEnd(e) {
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
  toggleRemoveAllBtn() {
    if (this.tasksManager.isEmpty() === true) {
      this.removeAllTasksButton.classList.add("hide");
    } else {
      this.removeAllTasksButton.classList.remove("hide");
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

  filterCompleteTasks(tasksToBeFiltered) {
    switch (this.chosenFilter) {
      case "all":
        return tasksToBeFiltered;
      case "completed":
        return tasksToBeFiltered.filter(
          (task) => task[TASK_COMPLETED] === true
        );
      case "uncompleted":
        return tasksToBeFiltered.filter(
          (task) => task[TASK_COMPLETED] === false
        );
      default:
        return tasksToBeFiltered;
    }
  }

  filterSearchedTasks(tasks) {
    const searchInput = this.searchInput.value;
    if (searchInput === "") {
      return tasks;
    } else {
      return tasks.filter((task) => {
        return task[TASK_CONTENT].toLowerCase().includes(
          searchInput.toLowerCase()
        );
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
    this.toggleRemoveAllBtn();
    filteredTasks.forEach(function (task) {
      const taskDiv = self.createTaskDiv(
        task[TASK_CONTENT],
        task[TASK_COMPLETED]
      );
      taskDiv.setAttribute("id", task[TASK_ID]);
      self.tasksList.appendChild(taskDiv);
      self.addTaskDivEventListeners(taskDiv);
    });
  }
}

const app = new AppDom(document);
