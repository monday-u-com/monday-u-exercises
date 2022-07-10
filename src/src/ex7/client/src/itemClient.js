
const url = "http://localhost:8081";
const headers = { "Content-Type": "application/json" ,'accept': 'application/json' };

export async function createItem(item) {
  // instead of calling this method
  // create action that handle this
  // dispatch('createItemLoading')
  // dispatch('createIteFailed')
  // dispatch('createItemSuccess',response.json())
  // dispatch('createIteFailed')
  // reduce ->switch(action.type)  return {...state, pokemonsFailed: true, isPokemonLoading:false}
  // reducer -> switch(action.type) { return {...state, pokemons: data.payload, isPokemonLoading:false}}
  try {
    // dispatch(createItemLoading)
    // pokemonsReducer = queryselectorstate=>state.poke;
    // {isPokemonLoading, pokemons} = pokemonsReducer;
    // isPokemonLoading ? <spinner></spinner> :
    // isPokemonFailed ? <h1>Failed get pokemons</h1> :
    // pokmeons.forEach(p => <h1>p.name</h1>)
    const response = await fetch(`${url}/item`, {
      method: "post",
      body: JSON.stringify({ item }),
      headers: headers,
    });
  // dispatch('createItemSuccess',response.json())

    if (response.status === 201) {
      return await response.json();
    }
  } catch (err) {
    // dispatch('createIteFailed')
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
  }
}

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
