export class TasksManeger {
  constructor() {
    this.tasks = [];
    this.counterID = 0;
    if (localStorage.getItem("tasks") !== null) {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    if (localStorage.getItem("counterID" != null)) {
      this.counterID = JSON.parse(localStorage.getItem("counterID"));
    }
  }

  addTask(task, isCompleted) {
    this.tasks.push([this.counterID, task, isCompleted]);
    this.counterID++;
    localStorage.setItem("counterID", JSON.stringify(this.counterID));
    this.saveTasksToLocalStorage();
    return this.counterID;
  }

  removeTask(taskContent) {
    console.log(taskContent);
    const index = this.tasks.find((task) => task[0] === taskContent);
    this.tasks.splice(index, 1);
    console.log(this.tasks);
    this.saveTasksToLocalStorage();
  }

  toggleCompleted(taskID) {
    const task = this.tasks.find((task) => task[0] == taskID);
    task[2] = !task[2];
    this.saveTasksToLocalStorage();
  }

  getTasks() {
    return this.tasks;
  }

  saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  reSortTasks(HTMLTaskList) {
    this.tasks = [];
    HTMLTaskList.forEach((taskDiv) => {
      const taskContent = taskDiv.querySelector("p").textContent;
      const isCompleted = taskDiv.classList.contains("task-completed");
      this.addTask(taskContent, isCompleted);
    });
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  isEmpty() {
    return this.tasks.length === 0;
  }
}
