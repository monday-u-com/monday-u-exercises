const url = "http://localhost:8081";
const headers = { "Content-Type": "application/json" }
export async function createItem(item) {
  try {
    const response = await fetch(`${url}/item`, {
      method: "post",
      body: JSON.stringify({ item }),
      headers: headers,
    });

    if (response.status === 201) {
      return await response.json();
    }
  } catch (err) {
    throw new Error("faild to create item");
  }
}


export async function fetchItems() {
  try {
    const response = await fetch(`${url}/item`);

    if (response.status !== 200) {
      throw new Error(" Error fetching items");
    }

    const data = await response.json();

    return data;
  } catch (err) {
    throw new Error("failed to fetch items");
  }}


export async function deleteItem(itemId) {
  try {
    await fetch(`${url}/item/${itemId}`, {
      method: "delete",
      headers: headers,
    });
  } catch (err) {
    throw new Error("failed to delete item");
  }
}

export async function deleteAllItems() {
  try {
    await fetch(`${url}/item`, {
      method: "delete",
      headers: headers,
    });
  } catch (err) {
    throw new Error("failed to delete all items ");
  }
}
export async function updateStatus(itemId, newStatus) {
  try {
    const response = await fetch(`${url}/item/updatestatus/${itemId}`, {
      method: "put",
      body: JSON.stringify({ status: newStatus }),
      headers: headers,
    });

    if (response.status === 200) {
      return await response.json();
    }
  } catch (err) {
    throw new Error(err);
  }
}

export async function editTaskName(itemId, newTaskName) {
  try {
    const response = await fetch(`${url}/item/${itemId}`, {
      method: "put",
      body: JSON.stringify({ taskName: newTaskName }),
      headers: headers,
    });

    if (response.status === 200) {
      return await response.json();
    }
  } catch (err) {
    throw new Error(err);
  }
}

