import actionTypes from "../actions/constants";

const initialState = {
};

// This reducer manages the items for our application
// It saves the items in the state by their ID
// so it would be easier to fetch a specific item
// Each action here add, remove or update the items without mutating the state
const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ITEMS_SUCCESS: {
      const { items } = action;
      return { ...items };
    }

    case actionTypes.ADD_ITEM_SUCCESS: {
      const { item } = action;
      return { ...state, [item.id]: item };
    }

    case actionTypes.REMOVE_ITEM_SUCCESS: {
      const { item } = action;
      const items = { ...state };
      delete items[item.id];
      return items;
    }

    case actionTypes.TOGGLE_ITEM_SUCCESS: {
      const { itemId } = action;
      const items = { ...state };
      items[itemId].status = !items[itemId].status;
      return items;
    }

    default:
      return state;
  }
};

export default itemsEntitiesReducer;
