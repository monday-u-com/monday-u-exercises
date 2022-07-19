import actionTypes from './constants';
import { addItems } from '../Services/item_client';

const addItemRequestAction = () => ({
  type: actionTypes.SET_STATUS,
  payload: { status: 'loading' },
});

export const addItemSuccessAction = (item) => ({
  type: actionTypes.ADD,
  payload: { item },
});

const addItemFailureAction = () => ({
  type: actionTypes.SET_STATUS,
  payload: { status: 'error' },
});

export const addNewItems = (items) => {
  return async (dispatch) => {
    dispatch(addItemRequestAction());
    try {
      const response = await addItems(items);
      response.forEach((newItem) => {
        dispatch(addItemSuccessAction(newItem));
      });
    } catch (e) {
      dispatch(addItemFailureAction());
    }
  };
};
