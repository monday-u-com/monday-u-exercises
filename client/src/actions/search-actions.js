import actionTypes from "./constants";

const setSearchInput = (text) => ({
   type: actionTypes.SET_SEARCH_INPUT,
   payload: text,
});

export const setSearchInputAction = (text) => {
   return (dispatch) => {
      dispatch(setSearchInput(text));
   };
};
