import actionsTypes from "./constants";

import {
    fetchItems,
    createItem,
    deleteAllItems,
    updateStatus,
    editTodoName,
    deleteItem,
  } from "../../itemClient";

  export const getItemsAction = () => {
    return async (dispatch) => {
      const items = await fetchItems();
      dispatch(addItems(items));
    };
  };
      
  const updateSearchInput = (searchInput) => ({
    type: actionsTypes.UPDATE_SEARCH_INPUT,
    payload: searchInput,
  });

  export const updateSearchInputAction = (searchInput) => {
    return async (dispatch) => {
      dispatch(updateSearchInput(searchInput));
    };
  };

  const addItems = (newItems) => ({
    type : actionsTypes.ADD_ITEMS,
    payload: newItems,
});

export const addItemsAction = (newItems) =>{
  return async (dispatch) => {
    const itemWasAdded = await createItem(newItems);
    dispatch(addItems(itemWasAdded))
  }
};

const deleteOneItem = (itemId) => ({
        type : actionsTypes.DELETE_ITEM,
        payload: itemId,
})


export const deleteItemAction = (itemId) =>{
  return async (dispatch) =>{
    await deleteItem(itemId);
    dispatch(deleteOneItem(itemId));
  };
};

const clearAllItems = () => ({
  type: actionsTypes.CLEAR_ALL_ITEMS,
});

export const clearAllItemsAction = () => {
  return async (dispatch) => {
     await deleteAllItems();
    dispatch(clearAllItems());
  };
};
  
const editItem = (itemId,newName) =>({
    type: actionsTypes.EDIT_ITEM,
    itemId,
    payload: newName,
});

export const editItemNameAction = (itemId,newName) =>{
  return async (dispatch) =>{
    await editTodoName(itemId,newName);
    dispatch(editItem(itemId,newName))
  }
}

const updateItemStatus = (itemId,checked) => ({
  type: actionsTypes.CHECKBOX_UPDATE,
  itemId : itemId,
  payload : checked,
});





export const updateCheckBoxAction = (itemId ,checked) => {
    return async (dispatch) => {
        await updateStatus(itemId,checked);
        dispatch(updateItemStatus(itemId,checked));
        // toast(`update item successfully`);
      };
    };
 

