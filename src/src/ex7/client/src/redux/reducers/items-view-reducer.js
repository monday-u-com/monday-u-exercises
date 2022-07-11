import actionsTypes from "../actions/constants";

const initialState = {
  showLoader: false,
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.DISPLAY_LOADER: {
      return {
        ...state,
        showLoader: true,
      };
    }

    case actionsTypes.HIDE_LOADER: {
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