class ItemClient {
  constructor() {
    this.serverURL = "http://localhost:3042/tasks/";
  }

  async fetchTasks() {
    const response = await fetch(this.serverURL);
    const tasks = await response.json();
    this.tasks = tasks;
    return tasks;
  }

  async addTask(taskInput, isCompleted, position) {
    const response = await fetch(this.serverURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemName: taskInput,
        status: isCompleted,
        position: position,
      }),
    });

    if (response.status === 200) {
      const res = await response.json();
      return { response: res, status: 200 };
    }
    return { error: "Task already exists", status: 409 };
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

  async updateTask(taskToUpdate) {
    const response = await fetch(this.serverURL + taskToUpdate.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemName: taskToUpdate.itemName,
        status: taskToUpdate.status,
      }),
    });
    if (response.status === 200) {
      return true;
    }
    return false;
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

  async updateTaskOrder(tasks) {
    const response = await fetch(this.serverURL + "resort", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  }
}

export default ItemClient;
