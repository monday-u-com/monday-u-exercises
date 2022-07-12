import actionTypes from "./constants";
import {
  createItem,
  deleteItem,
  editTaskName,
  updateStatus,
  fetchItems,
  deleteAllItems,
} from "../../itemClient";

const updateSelectInput = (selectInput) => ({
  type: actionTypes.UPDATE_SELECT_INPUT,
  payload: selectInput,
});

export const updateSelectInputAction = (selectInput) => {
  return async (dispatch) => {
    dispatch(updateSelectInput(selectInput));
  };
};

const updateSearchInput = (searchInput) => ({
  type: actionTypes.UPDATE_SEARCH_INPUT,
  payload: searchInput,
});

export const updateSearchInputAction = (searchInput) => {
  return async (dispatch) => {
    dispatch(updateSearchInput(searchInput));
  };
};

const clearAllItems = () => ({
  type: actionTypes.CLEAR_ALL_ITEMS,
});

export const clearAllItemsAction = () => {
  return async (dispatch) => {
    await deleteAllItems();
    dispatch(clearAllItems());
  };
};

const addItems = (newItems) => ({
  type: actionTypes.ADD_ITEMS,
  payload: newItems,
});

export const addItemsAction = (newItems) => {
  return async (dispatch) => {
    const addedItems = await createItem(newItems);
    dispatch(addItems(addedItems));
  };
};

const itemToDelete = (itemId) => ({
  type: actionTypes.DELETE_ITEM,
  payload: itemId,
});

export const deleteItemAction = (itemId) => {
  return async (dispatch) => {
    await deleteItem(itemId);
    dispatch(itemToDelete(itemId));
  };
};

const itemToEdit = (itemId, newName) => ({
  type: actionTypes.EDIT_ITEM_TO_NEW_NAME,
  itemId,
  payload: newName,
});

export const editItemNameAction = (itemId, newName) => {
  return async (dispatch) => {
    await editTaskName(itemId, newName);
    dispatch(itemToEdit(itemId, newName));
  };
};

const updateItemStatus = (itemId, checked) => ({
  type: actionTypes.UPDATE_CHECKBOX,
  itemId: itemId,
  payload: checked,
});

export const updateCheckBoxAction = (itemId, checked) => {
  return async (dispatch) => {
    await updateStatus(itemId, checked);
    dispatch(updateItemStatus(itemId, checked));
  };
};

export const getItemsAction = () => {
  return async (dispatch) => {
    const items = await fetchItems();
    dispatch(addItems(items));
  };
};
