export class TasksManeger {
  constructor() {
    this.tasks = [];
    if (localStorage.getItem("tasks") !== null) {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
  }

  addTask(task, isCompleted) {
    this.tasks.push([task, isCompleted]);
    this.saveTasksToLocalStorage();
  }

  removeTask(taskContent) {
    console.log(taskContent);
    const index = this.tasks.find((task) => task[0] === taskContent);
    this.tasks.splice(index, 1);
    console.log(this.tasks);
    this.saveTasksToLocalStorage();
  }

  toggleCompleted(taskContent) {
    this.tasks.forEach((task) => {
      if (task[0] === taskContent) {
        task[1] = !task[1];
      }
    });
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
