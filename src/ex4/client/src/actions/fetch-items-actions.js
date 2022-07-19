import actionTypes from './constants';
import { getItems } from '../Services/item_client';

const fetchItemsRequestAction = () => ({
  type: actionTypes.SET_STATUS,
  payload: { status: 'loading' },
});

const fetchItemsSuccessAction = (items) => ({
  type: actionTypes.FETCH,
  payload: { items },
});

const fetchItemsFailureAction = () => ({
  type: actionTypes.SET_STATUS,
  payload: { status: 'error' },
});

export const fetchItems = (field) => {
  return async (dispatch) => {
    dispatch(fetchItemsRequestAction());

    try {
      const items = await getItems(field);
      dispatch(fetchItemsSuccessAction(items));
    } catch (e) {
      dispatch(fetchItemsFailureAction());
    }
  };
};
