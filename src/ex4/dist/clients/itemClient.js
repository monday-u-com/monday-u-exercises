// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

import fetch from "node-fetch";


class ItemClient {
    async fetchAllItems() {
      const url = "/item" 
      
      const errorResponse = {
        error: true,
        data: ,
        description: `Items were not found`,
      };
      try {
        const response = await fetch(url);
        if (!response.ok) {
          return errorResponse;
        }
        const json = await response.json();
      
          return {
            error: false,
            data: json,
            description: `Items with ${json} data`,
          };
       
        return errorResponse;
      } catch (error) {
        console.log("this is error fetching the items");
        return errorResponse;
      }
    }
}


export default ItemClient;