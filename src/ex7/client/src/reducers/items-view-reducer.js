import actionTypes from "../actions/constants";

const initialState = {
  marked: { marked: false, unmarked: false },
  searchInput: "",
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.text,
      };
    case actionTypes.SET_MARKED:
      const { marked } = state;
      const { value } = action;
      const key = Object.keys(value)[0];
      let newMarked = { ...marked };
      if (key) {
        newMarked = initialState.marked;
      }
      newMarked = { ...newMarked, ...value };
      return {
        ...state,
        marked: newMarked,
      };
    default:
      return state;
  }
};
export default itemsViewReducer;
