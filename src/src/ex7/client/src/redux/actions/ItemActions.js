import actionsTypes from "./constants";
import { toast } from "react-toastify";
import {
    fetchItems,
    createItem,
    updateStatus,
    editTaskName,
    deleteItem,
  } from "../../itemClient";


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


  
const editItem = (itemId,newName) =>({
    type: actionsTypes.EDIT_ITEM,
    itemId,
    payload: newName,
});

export const editItemNameAction = (itemId,newName) =>{
  return async (dispatch) =>{
    await editTaskName(itemId,newName);
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
        toast(`update item successfully`);
      };
    };
 


