import actionTypes from './constants';

const showUndone = () => ({
  type: actionTypes.SHOW_UNDONE,
});

export const showUndoneAction = () => {
  return async (dispatch) => {
    dispatch(showUndone());
  };
};
