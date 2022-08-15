import actionTypes from "./constants";

const setSearchInput = (text) => ({
   type: actionTypes.SET_SEARCH_INPUT,
   payload: text,
});

const setDropdownFilter = (filterChoice) => ({
   type: actionTypes.SET_DROPDOWN_FILTER,
   payload: filterChoice,
});

const setSortDirection = (direction) => ({
   type: actionTypes.SET_SORT_DIRECTION,
   payload: direction,
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

export const setSortDirectionAction = (direction) => {
   return (dispatch) => {
      dispatch(setSortDirection(direction));
   };
};
