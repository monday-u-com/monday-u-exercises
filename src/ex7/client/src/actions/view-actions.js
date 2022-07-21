import actionTypes from "./constants";

const set_search_input = (text) => ({
  type: actionTypes.SET_SEARCH_INPUT,
  text,
});

const set_marked = (value) => ({
  type: actionTypes.SET_MARKED,
  value,
});

export const setSearchInputAction = (text) => {
  return (dispatch) => {
    dispatch(set_search_input(text));
  };
};

export const setMarkedAction = (value) =>{
  return (dispatch) =>{
    dispatch(set_marked(value));
  }
}
