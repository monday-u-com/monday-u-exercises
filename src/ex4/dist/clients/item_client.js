// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
const HOST = 'http://localhost';
const SERVER_PORT = 3000;
const ROUTE = 'todo';
const PATH = `${HOST}:${SERVER_PORT}/${ROUTE}`;
const STANDARD_HEADERS = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

class ItemClient {
    constructor() {
    }

    async getAllTasks() {
        const response = await fetch(PATH);
        const tasks = await response.json();
        return tasks;
    }

    async addTask(task) {
        const response = await fetch(PATH, {
            method: "POST",
            headers: STANDARD_HEADERS,
            body: JSON.stringify({ task })
        })
        const result = await response.json();
        console.log(result);
    }

    async removeTask(taskId) {
        const response = await fetch(`${PATH}/${taskId}`, {
            method: "DELETE",
            headers: STANDARD_HEADERS,
        })
        const result = await response.json();
        console.log(result,'task removed');
    }

    async removeAllTasks(){
       const response = await fetch(PATH, {
            method: "DELETE",
            headers: STANDARD_HEADERS,
        })
        await response.json();
    }
}

