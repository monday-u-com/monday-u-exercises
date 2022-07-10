import actionTypes from "../actions/constants";

const initialState = {
  showLoader: false,
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DISPLAY_LOADER: {
      return {
        ...state,
        showLoader: true,
      };
    }

    case actionTypes.HIDE_LOADER: {
      return {
        ...state,
        showLoader: false,
        
      };
    }
    
    default:
      return state;
  }
};
export default itemsViewReducer;