// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
const HOST = 'http://localhost';
const SERVER_PORT = 3000;
const ROUTE = 'todo';

class ItemClient {
    constructor() {
        this.PATH = `${HOST}:${SERVER_PORT}/${ROUTE}`;
        this.STANDARD_HEADERS = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    }

    async getAllTasks() {
        const response = await fetch(this.PATH);
        const tasks = await response.json();
        return tasks;
    }

    async addTask(task) {
        const response = await fetch(this.PATH, {
            method: "POST",
            headers: this.STANDARD_HEADERS,
            body: JSON.stringify({ task })
        })
        const result = await response.json();
        console.log(result);
    }

    async removeTask(taskId) {
        const response = await fetch(`${this.PATH}/${taskId}`, {
            method: "DELETE",
            headers: this.STANDARD_HEADERS,
        })
        const result = await response.json();
        console.log(result,'task removed');
    }

    async removeAllTasks(){
       const response = await fetch(this.PATH, {
            method: "DELETE",
            headers: this.STANDARD_HEADERS,
        })
        await response.json();
    }
}

