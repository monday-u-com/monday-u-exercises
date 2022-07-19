import actionTypes from './constants';
import { removeAll } from '../Services/item_client';

const removeAllRequestAction = () => ({
  type: actionTypes.SET_STATUS,
  payload: { status: 'loading' },
});

const removeAllSuccessAction = () => ({
  type: actionTypes.DELETE_ALL,
});

const removeAllFailureAction = () => ({
  type: actionTypes.SET_STATUS,
  payload: { status: 'error' },
});

export const deleteAll = () => {
  return async (dispatch) => {
    dispatch(removeAllRequestAction());

    try {
      await removeAll();
      dispatch(removeAllSuccessAction());
    } catch (e) {
      dispatch(removeAllFailureAction());
    }
  };
};
