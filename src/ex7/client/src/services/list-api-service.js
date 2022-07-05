export default class ListApiService {
  /**
   * A function to get all existing todo items
   * @returns {Promise<{ name: string, id: number, status: bool }[]>}
   */
  static async getItems() {
    const response = await fetch('/items');
    const todos = await response.json();

    return todos;
  }

  /**
   * A function to add a new item to the list
   * @param itemName: string
   * @returns {Promise<object>}
   */
  static async postItem(itemName) {
    const response = await fetch('/item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: itemName })
    });

    const item = await response.json();

    return item;
  }

  /**
   * A function to toggle an item in the list
   * @param item: { name: string, id: number, status: bool }
   * @returns {Promise<boolean>}
   */
  static async toggleDone(item) {
    const response = await fetch(`/item/${item.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item })
    });

    return response.ok;
  }

  /**
   * A function to remove an item from the list
   * @param item: { name: string, id: number, status: bool }
   * @returns {Promise<boolean>}
   */
  static async deleteItem(item) {
    const response = await fetch('/item', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item })
    });

    return response.ok;
  }
}
