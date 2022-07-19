import actionTypes from '../actions/constants';

const initialState = {
  show: 'all',
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_DONE:
      return { ...state, show: 'done' };
    case actionTypes.SHOW_UNDONE:
      return { ...state, show: 'undone' };
    case actionTypes.SHOW_ALL:
      return { ...state, show: 'all' };
    default:
      return state;
  }
};

export default itemsViewReducer;
