// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
const HOST = "http://localhost";
const SERVER_PORT = 3000;
const ROUTE = "/todo";
const PATH = `${HOST}:${SERVER_PORT}/${ROUTE}`;
const STANDARD_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

class ItemClient {
  constructor() {}

  async getAllTasks() {
    try {
      const response = await fetch(ROUTE);
      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error("Get all tasks error:", error);
    }
  }

  async addTask(task) {
    try {
      const response = await fetch(ROUTE, {
        method: "POST",
        headers: STANDARD_HEADERS,
        body: JSON.stringify({ task }),
      });
    } catch {
      console.error("Add task error:", error);
    }
  }

  async removeTask(taskId) {
    try {
      const response = await fetch(`${ROUTE}/${taskId}`, {
        method: "DELETE",
        headers: STANDARD_HEADERS,
      });
    } catch (error) {
      console.error("Remove task error:", error);
    }
  }

  async removeAllTasks() {
    try {
      const response = await fetch(ROUTE, {
        method: "DELETE",
        headers: STANDARD_HEADERS,
      });
    } catch (error) {
      console.error("Remove all tasks error:", error);
    }
  } 
}
