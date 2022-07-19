import actionTypes from './constants';
import { removeItem } from '../Services/item_client';

const removeItemRequestAction = (id) => ({
  type: actionTypes.SET_STATUS,
  payload: { status: 'loading', id },
});

const removeItemSuccessAction = (id) => ({
  type: actionTypes.DELETE,
  payload: { id },
});

const removeItemFailureAction = (id) => ({
  type: actionTypes.SET_STATUS,
  payload: { status: 'error', id },
});

export const deleteItem = (id) => {
  return async (dispatch) => {
    dispatch(removeItemRequestAction());

    try {
      await removeItem(id);
      dispatch(removeItemSuccessAction(id));
    } catch (e) {
      dispatch(removeItemFailureAction(id));
    }
  };
};
