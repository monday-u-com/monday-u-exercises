// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

const url = "http://localhost:8080";
class ItemClient {
  constructor() {}
  async fetchAllItems() {
    const urlFetchAllItems = `${url}/item`;

    const errorResponse = {
      error: true,

      description: `Items were not found`,
    };
    try {
      const response = await fetch(urlFetchAllItems);

      if (!response.ok) {
        return errorResponse;
      }
      const json = await response.json();
      return {
        error: false,
        data: json,
        description: `Items with ${json} data`,
      };
    } catch (error) {
      console.log("this is error fetching the items");

      return errorResponse;
    }
  }

  async deleteItemById(itemId) {
    const urlDeleteItem = `${url}/item/delete_item/${itemId}`;

    axios
      .delete(urlDeleteItem, {
        headers: {},
        data: {},
      })
      .then((resp) => resp.data);
  }

  async createItem(input) {
    const urlCreateItem = url + `/item/create_item/`;

    const errorResponse = {
      error: true,

      description: `Items were not found`,
    };

    return await axios.post(urlCreateItem, {
      data: {
        input,
      },
    });

  }
}
