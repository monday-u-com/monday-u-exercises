import actionTypes from "../actions/constants";

const initialState = {
   loaderShow: true,
};

const itemsViewReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.SHOW_LOADER:
         return { loaderShow: true };
      case actionTypes.HIDE_LOADER:
         return { loaderShow: false };
      default:
         return state;
   }
};
export default itemsViewReducer;
