// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)




class ItemClient {
  constructor(){
    
  }
     async fetchAllItems() {
      const url = "http://localhost:8080/item" 
      
      const errorResponse = {
        error: true,
       
        description: `Items were not found`,
      };
      try {
        const response = await axios.get(url);
      
      
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
}


