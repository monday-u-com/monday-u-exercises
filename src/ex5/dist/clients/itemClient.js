// const { default: axios } = require("axios");


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

    try {
      await fetch(urlDeleteItem, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      throw new Error("failed to delete item");
    }
  }

  async createItem(input) {
    const urlCreateItem = url + `/item/create_item/`;

    try {
      // const response = await fetch(urlCreateItem, {
      //   method: "POST",
      //   body: JSON.stringify({ item: input }),
      //   headers: { "Content-Type": "application/json" },
      // });
      const response = await axios.post(urlCreateItem, { data: input })
    } catch (e) {
      console.log("this is error creating item", e);
    }
  }
}