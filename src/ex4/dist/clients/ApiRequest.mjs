
export async function GetResourceRequest(url) {
  try {
    const response = await fetch(`/${url}`)
    // check if response is valid
    if (!response.ok) {
      throw new Error(`Cant get ${url}`);
    }
    // parse response to json object
    const res_obj = await response.json();
    return res_obj;
  }
  catch (error) {
    throw (error);
  }
}

export async function AddNewResourceRequest(url, data) {
  try {
    const response = await fetch(`/${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // parse response to json object
    const res_obj = await response.json();
    // check if response is valid
    if (response.status !== 201) {
      throw new Error(res_obj.error);
    }    
    return res_obj;
  } catch (error) {
    throw error;
  }
}

export async function DeleteResourceRequest(url) {
  try {
    const response = await fetch(`/${url}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    // check if response is valid
    if (!response.ok) {
      throw new Error(`Cant delete ${url}`);
    }
    // parse response to json object
    const res_obj = await response.json();
    return res_obj;
  } catch (error) {
    throw error;
  }
}

export async function PatchResourceRequest(url) {
  try {
    const response = await fetch(`/${url}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    // check if response is valid
    if (!response.ok) {
      throw new Error(`Cant patch ${url}`);
    }
    // parse response to json object
    const res_obj = await response.json();
    return res_obj;
  } catch (error) {
    throw error;
  }
}

export async function PutResourceRequest(url) {
  try {
    const response = await fetch(`/${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    // check if response is valid
    if (!response.ok) {
      throw new Error(`Cant patch ${url}`);
    }
    // parse response to json object
    const res_obj = await response.json();
    return res_obj;
  } catch (error) {
    throw error;
  }
}