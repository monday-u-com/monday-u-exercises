export class ItemManager {
  constructor() {
    this.serverURL = "http://localhost:8080/tasks/";
  }

  async getTasksLength() {
    const response = await fetch(this.serverURL + "length", { mode: "cors" });
    const data = await response.json();
    return data.length;
  }

  async fetchTasks() {
    const response = await fetch(this.serverURL);
    const tasks = await response.json();
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

  async reSortTasks() {}
}
