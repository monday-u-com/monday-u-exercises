import actionTypes from './constants';

const showDone = () => ({
  type: actionTypes.SHOW_DONE,
});

export const showDoneAction = () => {
  return async (dispatch) => {
    dispatch(showDone());
  };
};
