export class ItemClient {
  constructor() {
    this.serverURL = "/tasks/";
    this.tasks = [];
  }

  async getTasksLength() {
    const response = await fetch(this.serverURL + "length", { mode: "cors" });
    const data = await response.json();
    return data.length;
  }

  async fetchTasks() {
    const response = await fetch(this.serverURL);
    const tasks = await response.json();
    this.tasks = tasks;
    return tasks;
  }

  async addTask(taskInput, isCompleted) {
    const response = await fetch(this.serverURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: taskInput,
        isCompleted: isCompleted,
      }),
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  }

  async removeTask(taskID) {
    const response = await fetch(this.serverURL + taskID, {
      method: "DELETE",
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  }

  async toggleCompleted(taskID) {
    const response = await fetch(this.serverURL + taskID, {
      method: "PUT",
    });
    if (response.status === 200) {
      const task = await response.json();
      this.tasks = this.tasks.map((task) => {
        if (task.id === taskID) {
          return task;
        }
        return task;
      });
    }
  }

  async removeAllTasks() {
    const response = await fetch(this.serverURL, {
      method: "DELETE",
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  }

  pushTaskFromReSort(id, taskContent, isCompleted) {
    this.tasks.push({ id: id, content: taskContent, isCompleted: isCompleted });
  }

  async putResort(tasks) {
    await fetch("/resort", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    });
  }

  async reSortTasks(HTMLTaskList) {
    this.tasks = [];
    HTMLTaskList.forEach((taskDiv) => {
      const taskContent = taskDiv.querySelector("p").textContent;
      const isCompleted = taskDiv.classList.contains("task-completed");
      const taskID = taskDiv.getAttribute("id");
      this.pushTaskFromReSort(taskID, taskContent, isCompleted);
    });
    await this.putResort(this.tasks);
  }
}
