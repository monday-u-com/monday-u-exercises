// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
const HOST = "http://localhost";
const SERVER_PORT = 3001;
const ROUTE = "/todo";
const PATH = `${HOST}:${SERVER_PORT}${ROUTE}`;
const STANDARD_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export async function getAllTasks() {
  try {
    const response = await fetch(ROUTE);
    const tasks = await response.json();
    return tasks;
  } catch (error) {
<<<<<<< HEAD
    console.error("Get all tasks error:", error.message);
=======
    console.error("Get all tasks error:", error);
>>>>>>> main
  }
}

export async function addTask(task) {
  try {
    const response = await fetch(ROUTE, {
      method: "POST",
      headers: STANDARD_HEADERS,
      body: JSON.stringify({ task }),
    });
<<<<<<< HEAD
    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error("Add task error:", error.message);
=======
  } catch (error) {
    console.error("Add task error:", error);
>>>>>>> main
  }
}

export async function removeTask(task) {
  try {
    const response = await fetch(ROUTE, {
      method: "DELETE",
      headers: STANDARD_HEADERS,
<<<<<<< HEAD
      body: JSON.stringify(task),
    });
    const tasks = await response.json();
    return tasks;
=======
      body: JSON.stringify({ task }),
    });
>>>>>>> main
  } catch (error) {
    console.error("Remove task error:", error);
  }
}

export async function updateTask(task) {
  try {
    const response = await fetch(ROUTE, {
      method: "PUT",
      headers: STANDARD_HEADERS,
      body: JSON.stringify(task),
    });
<<<<<<< HEAD
    const tasks = await response.json();
    return tasks;
=======
>>>>>>> main
  } catch (error) {
    console.error("update task error:", error);
  }
}

export async function removeAllTasks() {
  try {
    const response = await fetch(ROUTE + "/delete_all", {
      method: "DELETE",
      headers: STANDARD_HEADERS,
    });
  } catch (error) {
    console.error("Remove all tasks error:", error);
  }
}
