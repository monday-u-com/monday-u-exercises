import actionTypes from './constants';

const searchAction = (text) => ({
  type: actionTypes.SEARCH,
  text,
});

export const search = (text) => {
  return async (dispatch) => {
    dispatch(searchAction(text));
  };
};
