import actionTypes from '../actions/constants';
import {
  getItems,
  addItems,
  removeAll,
  editItem,
  removeItem,
  changeStatus,
} from '../Services/item_client';

const initialState = {
  items: [],
  searchedItems: null,
  status: 'idle',
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_STATUS: {
      return { ...state, status: action.payload.status };
    }
    case actionTypes.FETCH: {
      const { items } = action.payload;
      return { ...state, items: items, status: 'idle' };
    }
    case actionTypes.ADD: {
      const { item } = action.payload;
      const items = [...state.items, item];
      return { ...state, items: items, status: 'idle' };
    }
    case actionTypes.DELETE: {
      const { id } = action.payload;
      const items = [...state.items].filter((item) => item.id !== id);
      return { ...state, items: items };
    }
    case actionTypes.DELETE_ALL: {
      return { ...state, items: [] };
    }
    case actionTypes.CHECK: {
      const { id, newStatus } = action.payload;
      const items = [...state.items];
      const itemToCheck = state.items.findIndex((item) => item.id === id);
      const clonedItem = { ...items[itemToCheck], status: newStatus };
      items[itemToCheck] = clonedItem;
      return { ...state, items: items };
    }
    case actionTypes.EDIT_TEXT: {
      const { id, newText } = action.payload;
      const items = [...state.items];
      const itemToEdit = items.findIndex((item) => item.id === id);
      const clonedItem = { ...items[itemToEdit], name: newText };
      items[itemToEdit] = clonedItem;
      return { ...state, items: items };
    }
    case actionTypes.SEARCH: {
      const { text } = action.payload;
      const items = [...state.items];
      const searchedItemsIds = text
        ? items
            .filter((item) => item.name.includes(text))
            .map((item) => item.id)
        : null;
      return { ...state, searchedItems: searchedItemsIds };
    }
    default:
      return state;
  }
};

export function fetchItems(field) {
  return async (dispatch) => {
    dispatch({ type: 'SET_STATUS', payload: { status: 'loading' } });
    const response = await getItems(field);
    dispatch({ type: 'FETCH', payload: { items: response } });
    dispatch({ type: 'SET_STATUS', payload: { status: 'idle' } });
  };
}

export function addNewItems(items) {
  return async (dispatch) => {
    dispatch({ type: 'SET_STATUS', payload: { status: 'loading' } });
    const response = await addItems(items);
    response.forEach((newItem) => {
      dispatch({ type: 'ADD', payload: { item: newItem } });
    });
    dispatch({ type: 'SET_STATUS', payload: { status: 'idle' } });
  };
}

export function editItemText(id, newText) {
  return async (dispatch) => {
    await editItem(id, newText);
    dispatch({ type: 'EDIT_TEXT', payload: { id, newText } });
  };
}

export function changeItemStatus(id, newStatus) {
  return async (dispatch) => {
    await changeStatus(id, newStatus);
    dispatch({ type: 'CHECK', payload: { id, newStatus } });
  };
}

export function deleteItem(id) {
  return async (dispatch) => {
    await removeItem(id);
    dispatch({ type: 'DELETE', payload: { id } });
  };
}

export function deleteAll() {
  return async (dispatch) => {
    dispatch({ type: 'SET_STATUS', payload: { status: 'loading' } });
    await removeAll();
    dispatch({ type: 'DELETE_ALL' });
    dispatch({ type: 'SET_STATUS', payload: { status: 'idle' } });
  };
}

export const searchAction = (text) => {
  return (dispatch) => {
    dispatch({ type: 'SEARCH', payload: { text } });
  };
};

export default itemsEntitiesReducer;
