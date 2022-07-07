import actionTypes from "./constants";

const setSearchInput = (text) => ({
   type: actionTypes.SET_SEARCH_INPUT,
   payload: text,
});

const setDropdownFilter = (filterChoice) => ({
   type: actionTypes.SET_DROPDOWN_FILTER,
   payload: filterChoice,
});

export const setSearchInputAction = (text) => {
   return (dispatch) => {
      dispatch(setSearchInput(text));
   };
};

export const setDropdownFilterAction = (filterChoice) => {
   return (dispatch) => {
      dispatch(setDropdownFilter(filterChoice));
   };
};
