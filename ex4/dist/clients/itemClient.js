class ItemClinet {
  constructor() {}

  async createItem(item) {
    const response = await fetch("/item", {
      method: "post",
      body: JSON.stringify({ item }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status == 201) {
      return await response.json();
    }
  }

  async fetchItems() {
    const response = await fetch("/item", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.status != 200) {
      throw new Error(" Error fetching items");
    }

    const data = await response.json();

    return data;
  }

  async deleteItem(itemId) {
    try {
       await fetch(`/item/${itemId}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      throw new Error("failed to delete item");
    }
  }

async deleteAll()
{
    try {
        await fetch('/item' ,{
         method: "delete",
         headers: { "Content-Type": "application/json" },
       });
     } catch (err) {
       throw new Error("failed to delete all items ");
     }
   }

}






export default new ItemClinet();
