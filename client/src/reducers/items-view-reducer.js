import actionTypes from "../actions/constants";

const initialState = {
   loaderShow: true,
   searchInput: "",
};

const itemsViewReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.SHOW_LOADER:
         return { loaderShow: true, searchInput: state.searchInput };
      case actionTypes.HIDE_LOADER:
         return { loaderShow: false, searchInput: state.searchInput };
      case actionTypes.SET_SEARCH_INPUT:
         return { loaderShow: state.loaderShow, searchInput: action.payload };

      default:
         return state;
   }
};
export default itemsViewReducer;
