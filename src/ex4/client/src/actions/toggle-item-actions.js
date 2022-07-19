import actionTypes from './constants';
import { changeStatus } from '../Services/item_client';

const toggleItemRequestAction = () => ({
  type: actionTypes.SET_STATUS,
  payload: { status: 'loading' },
});

const toggleItemSuccessAction = (id, newStatus) => ({
  type: actionTypes.CHECK,
  payload: { id, newStatus },
});

const toggleItemFailureAction = () => ({
  type: actionTypes.SET_STATUS,
  payload: { status: 'error' },
});

export const changeItemStatus = (id, newStatus) => {
  return async (dispatch) => {
    dispatch(toggleItemRequestAction());
    try {
      await changeStatus(id, newStatus);
      dispatch(toggleItemSuccessAction(id, newStatus));
    } catch (e) {
      dispatch(toggleItemFailureAction());
    }
  };
};
