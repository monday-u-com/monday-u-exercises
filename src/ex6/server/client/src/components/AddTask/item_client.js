export class ItemClient {
  getItems = async () => {
    const response = await fetch("http://localhost:3042/items")
    const todos = await response.json()

    return todos
  }

  postItem = async (item) => {
    await fetch("http://localhost:3042/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    })
  }

  toggleDone = async (item) => {
    await fetch(`http://localhost:3042/item/${item.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    })
  }

  deleteItem = async (item) => {
    await fetch("http://localhost:3042/item", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    })
  }
}
