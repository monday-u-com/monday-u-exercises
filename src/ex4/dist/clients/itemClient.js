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
      const response = await axios.get(urlFetchAllItems);

      return {
        error: false,
        data: response.data,
        description: `Items with ${response.data} data`,
      };
    } catch (error) {
      console.log("this is error fetching the items");
      return errorResponse;
    }
  }

  async deleteItemById(itemId) {
    const urlDeleteItem = `${url}/item/delete_item/${itemId}`;

    axios.delete(urlDeleteItem).then((resp) => resp.data);
  }

  async createItem(input) {
    const urlCreateItem = url + `/item/create_item/`;

    const errorResponse = {
      error: true,

      description: `Items were not found`,
    };
    
    axios({
      method: "post",
      url: urlCreateItem,
      headers: {},
      data: {
       input
      },
    });

  
  }


}
