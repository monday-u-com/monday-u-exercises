import actionTypes from "../actions/constants";

const initialState = {
  showLoader: false,
  showClearButton: false,
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DISPLAY_LOADER: {
      return {
        showLoader: true,
        showClearButton: state.showClearButton,
      };
    }

    case actionTypes.HIDE_LOADER: {
      return {
        showLoader: false,
        showClearButton: state.showClearButton,
        
      };
    }

    case actionTypes.SHOW_CLEAR_BUTTON: {
      return {
        showClearButton: true,
        showLoader: state.showLoader,
      };
    }

    case actionTypes.HIDE_CLEAR_BUTTON: {
      return {
        showClearButton: false,
        showLoader: state.showLoader,
       
      };
    }
    default:
      return state;
  }
};
export default itemsViewReducer;