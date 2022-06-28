class ItemClient {
  constructor() {}

  async createItem(item) {
    try {
      const response = await fetch("/item", {
        method: "POST",
        body: JSON.stringify({ item }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status == 201) {
        return await response.json();
      }
    } catch (err) {
      throw new Error("faild to create item");
    }
  }


async fetchItems() {
  try {
    const response = await fetch("/item", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.status != 200) {
      throw new Error(" Error fetching items");
    }

    const data = await response.json();

    return data;
  } catch (err) {
    throw new Error("failed while fetching items");
  }
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
  async statusChange(itemId,newStatus) {
    try {
      const response = await fetch(`/item/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({ status:newStatus }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status == 200) {
        return await response.json();
      }
    } catch (err) {
    console.log(err)
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
