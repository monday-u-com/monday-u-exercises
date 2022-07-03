const URL = 'http://localhost:8080/tasks';

export async function getItems(field = 'createdAt') {
  try {
    const response = await fetch(`${URL}/getAll/${field}`);
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (err) {
    console.log('some error occured:', err.message);
  }
}

export async function addItems(items) {
  try {
    const response = await fetch(`${URL}/addItem`, {
      method: 'POST',
      body: JSON.stringify(items),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.log('Could not add tasks');
      return;
    }
    return await response.json();
  } catch (err) {
    console.log('some error occured:', err.message);
  }
}

export async function removeItem(id) {
  try {
    const response = await fetch(`${URL}/deleteItem/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.log('Could not delete task');
      return;
    }
  } catch (err) {
    console.log('some error occured:', err.message);
  }
}

export async function removeAll() {
  try {
    const response = await fetch(`${URL}/deleteAll`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.log('Could not delete tasks');
      return;
    }
  } catch (err) {
    console.log('some error occured:', err.message);
  }
}

export async function changeStatus(id, newStatus) {
  try {
    const response = await fetch(`${URL}/changeStatus/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.log('Could not change status');
      return;
    }
  } catch (err) {
    console.log('some error occured:', err.message);
  }
}

export async function editItem(id, text) {
  try {
    const response = await fetch(`${URL}/editItem/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ name: text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.log('Could not edit task');
      return;
    }
    return response;
  } catch (err) {
    console.log('some error occured:', err.message);
  }
}
