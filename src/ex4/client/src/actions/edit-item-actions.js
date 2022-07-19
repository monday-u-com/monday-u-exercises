import actionTypes from './constants';
import { editItem } from '../Services/item_client';

const editItemRequestAction = () => ({
  type: actionTypes.SET_STATUS,
  payload: { status: 'loading' },
});

const editItemSuccessAction = (id, newText) => ({
  type: actionTypes.EDIT_TEXT,
  payload: { id, newText },
});

const editItemFailureAction = () => ({
  type: actionTypes.SET_STATUS,
  payload: { status: 'error' },
});

export const editItemText = (id, newText) => {
  return async (dispatch) => {
    dispatch(editItemRequestAction());
    try {
      await editItem(id, newText);
      dispatch(editItemSuccessAction(id));
    } catch (e) {
      dispatch(editItemFailureAction());
    }
  };
};
