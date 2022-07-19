import actionTypes from './constants';

const showAll = () => ({
  type: actionTypes.SHOW_ALL,
});

export const showAllAction = () => {
  return async (dispatch) => {
    dispatch(showAll());
  };
};
