import { ItemManager } from "../clients/ItemManager.js";
import { Alert } from "./Alert.js";
const EMPTY_INPUT_MSG = "Task input cannot be empty, please try again";

class main {
  constructor(htmlElement) {
    this.tasksManager = new ItemManager();
    this.emprtyInputAlert = new Alert(htmlElement);

    // Action Elements //

    this.taskInput = htmlElement.querySelector(".task-input");
    this.addTaskButton = htmlElement.getElementById("task-add-btn");
    this.filterOption = htmlElement.getElementById("filter-dropdown");
    this.searchInput = htmlElement.getElementById("search-input");
    this.chosenFilter = "all";

    // Task List Elements //

    this.tasksList = htmlElement.querySelector(".tasks-list");
    this.dragArea = htmlElement.querySelector(".tasks-list");
    this.emptyListMsg = htmlElement.getElementById("empty-tasks");
    this.removeAllTasksButton = htmlElement.getElementById("remove-all-btn");

    // Events init //

    this.activateSortable(this.tasksManager);
    this.addFieldsEventListeners();
  }

  // Init Methods //

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
    this.filterOption.onchange = this.onFilterOptionChange.bind(this);
    this.searchInput.onkeyup = this.onSearchInputKeyUp.bind(this);
    this.removeAllTasksButton.onclick = this.onRemoveAllTasksClick.bind(this);

    this.taskInput.onkeyup = (e) => {
      if (e.key === "Enter") {
        console.log(e);
        e.preventDefault();
        this.onAddTaskClick(e);
      }
    };

    this.addTaskButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await this.onAddTaskClick(e);
      return false;
    });
  }

  async init() {
    console.log("Main init");
    await this.renderTasks();
  }

  // Action Methods //

  async onAddTaskClick(e) {
    console.log(e);
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
        await this.renderTasks();
      }
      //else - alert exists, or other error do nothing for now, but later we can add some error alert handling
    }
    this.taskInput.value = "";
    return false;
  }

  canProceed() {
    return this.taskInput.value.trim() !== "";
  }

  async onRemoveAllTasksClick(e) {
    this.tasksManager.removeAllTasks();
    await this.renderTasks();
  }

  async toggleEmptyMsg() {
    const tasksLength = await this.tasksManager.getTasksLength();
    if (tasksLength === 0) {
      this.emptyListMsg.classList.remove("hide");
    } else {
      this.emptyListMsg.classList.add("hide");
    }
  }

  async toggleRemoveAllBtn(filteredTasks) {
    const tasksLength = await this.tasksManager.getTasksLength();
    const filteredTasksSize = filteredTasks.length;
    if (filteredTasks.length < tasksLength || filteredTasksSize === 0) {
      this.removeAllTasksButton.classList.add("hide");
    } else {
      this.removeAllTasksButton.classList.remove("hide");
    }
  }

  async onSearchInputKeyUp(e) {
    await this.renderTasks();
  }

  async onFilterOptionChange(e) {
    this.chosenFilter = e.target.value;
    await this.renderTasks();
  }

  // List Events //

  async onCompleteBtnClick(e) {
    e.target.classList.toggle("btn-completed");
    const taskItem = e.target.parentElement;
    taskItem.classList.toggle("task-completed");
    const taskId = taskItem.getAttribute("id");
    this.tasksManager.toggleCompleted(parseInt(taskId));
    await this.renderTasks();
  }

  async onRemoveBtnClick(e) {
    const taskItem = e.target.parentElement;
    const taskId = taskItem.getAttribute("id");
    this.tasksManager.removeTask(parseInt(taskId));
    await this.renderTasks();
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

  async updateIDsAfterReSort() {
    const tasks = await this.tasksManager.fetchTasks();
    this.tasksList.children.forEach((task, index) =>
      task.setAttribute("id", tasks[index].id)
    );
  }

  // Task Creation Methods //

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

  addTaskDivEventListeners(taskDiv) {
    taskDiv.onmouseover = this.onTaskMouseOver.bind(this);
    taskDiv.onmouseleave = this.onTaskMouseOut.bind(this);
    taskDiv.addEventListener("click", this.onTaskClick);
    taskDiv.draggable = true;
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

  // Render Methods //

  filterCompleteTasks(tasksToBeFiltered) {
    switch (this.chosenFilter) {
      case "all":
        return tasksToBeFiltered;
      case "completed":
        return tasksToBeFiltered.filter((task) => task.isCompleted === true);
      case "uncompleted":
        return tasksToBeFiltered.filter((task) => task.isCompleted === false);
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
        return task.content.toLowerCase().includes(searchInput.toLowerCase());
      });
    }
  }

  async renderTasks() {
    this.tasksList.innerHTML = "";
    const tasks = await this.tasksManager.fetchTasks();
    const completeFilter = this.filterCompleteTasks(tasks);
    const filteredTasks = this.filterSearchedTasks(completeFilter);
    const self = this;
    this.toggleEmptyMsg();
    this.toggleRemoveAllBtn(filteredTasks);
    filteredTasks.forEach(function (task) {
      const taskDiv = self.createTaskDiv(task.content, task.isCompleted);
      taskDiv.setAttribute("id", task.id);
      self.tasksList.appendChild(taskDiv);
      self.addTaskDivEventListeners(taskDiv);
    });
  }
}

const app = new main(document);

document.addEventListener("DOMContentLoaded", async function () {
  await app.init();
  console.log("DOMContentLoaded");
});
