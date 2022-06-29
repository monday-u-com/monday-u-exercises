  const URL = "http://localhost:8080";
  
    export async function createItem(item) {
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
  
  
    export async function fetchItems() {
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
  
  export async function deleteItem(itemId) {
      try {
         await fetch(`/item/${itemId}`, {
          method: "delete",
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        throw new Error("failed to delete item");
      }
    }
    export async function statusChange(itemId,newStatus) {
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
  
    export async function deleteAll()
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
  
  
  