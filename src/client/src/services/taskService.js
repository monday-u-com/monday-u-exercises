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

  async addTask(taskInput, isCompleted) {
    const response = await fetch(this.serverURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemName: taskInput,
        status: isCompleted,
      }),
    });

    if (response.status === 200) {
      const res = await response.json();
      return res;
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

  /*
  pushTaskFromReSort(id, taskContent, isCompleted) {
    this.tasks.push({ id: id, itemName: taskContent, status: isCompleted });
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
    */
}

export default ItemClient;
