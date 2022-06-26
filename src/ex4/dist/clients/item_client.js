// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

export class ItemClient {
  constructor() {
    this.URL = 'http://localhost:8080/tasks';
  }

  async getTasks() {
    try {
      const response = await fetch(`${this.URL}/getAll`);
      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.log('some error occured:', err.message);
    }
  }

  async addTasks(tasks) {
    try {
      const response = await fetch(`${this.URL}/addTask`, {
        method: 'POST',
        body: JSON.stringify(tasks),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.log('Could not add tasks');
        return;
      }
    } catch (err) {
      console.log('some error occured:', err.message);
    }
  }

  async removeItem(item) {
    try {
      const response = await fetch(`${this.URL}/deleteTask`, {
        method: 'DELETE',
        body: JSON.stringify({ text: item }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.log('Could not delete task');
        return;
      }
    } catch (err) {
      console.log('some error occured:', err.message);
    }
  }

  async removeAll() {
    try {
      const response = await fetch(`${this.URL}/deleteAll`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.log('Could not delete tasks');
        return;
      }
    } catch (err) {
      console.log('some error occured:', err.message);
    }
  }
}
