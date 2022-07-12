import actionTypes from "../actions/constants";

const initialState = {
  tasksStatus:true,
  searchInput: "",
  items: [],
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEMS:
      return {
        ...state,
        items: [...state.items, ...action.payload],
      };

    case actionTypes.DELETE_ITEM:
      return {
        ...state,
        items: [
          ...state.items.filter((item) => item.itemId !== action.payload),
        ],
      };
    case actionTypes.EDIT_ITEM_TO_NEW_NAME:
      return {
        ...state,
        items: state.items.map((item) =>
          item.itemId === action.itemId
            ? { ...item, item: action.payload }
            : item
        ),
      };
    case actionTypes.UPDATE_CHECKBOX:
      return {
        ...state,
        items: state.items.map((item) =>
          item.itemId === action.itemId
            ? { ...item, status: action.payload }
            : item
        ),
      };

    case actionTypes.CLEAR_ALL_ITEMS:
      return {
        ...state,
        items: [],
      };

    case actionTypes.UPDATE_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.payload,
      };

    case actionTypes.UPDATE_SELECT_INPUT:
      return {
        ...state,
        tasksStatus:action.payload
      };

  

    default:
      return state;
  }
};

export default itemsEntitiesReducer;
