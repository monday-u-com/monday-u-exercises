export class ItemClient {
  constructor() {
    this.URL = 'http://localhost:8080/tasks';
  }

  async getItems() {
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

  async addItems(items) {
    try {
      const response = await fetch(`${this.URL}/addItem`, {
        method: 'POST',
        body: JSON.stringify(items),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.log('Could not add tasks');
        return;
      }
      return response;
    } catch (err) {
      console.log('some error occured:', err.message);
    }
  }

  async removeItem(id) {
    try {
      const response = await fetch(`${this.URL}/deleteItem/${id}`, {
        method: 'DELETE',
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

  async changeState(id) {
    try {
      const response = await fetch(`${this.URL}/changeState/${id}`);

      if (!response.ok) {
        console.log('Could not change status');
        return;
      }
    } catch (err) {
      console.log('some error occured:', err.message);
    }
  }

  async editItem(id, text) {
    try {
      const response = await fetch(`${this.URL}/editItem/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ItemName: text }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.log('Could not edit task');
        return;
      }
      return response;
    } catch (err) {
      console.log('some error occured:', err.message);
    }
  }
}
