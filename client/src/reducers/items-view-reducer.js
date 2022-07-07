import actionTypes from "../actions/constants";

const initialState = {
   loaderShow: true,
   searchInput: "",
   dropdownFilter: "all",
};

const itemsViewReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.SHOW_LOADER:
         return {
            loaderShow: true,
            searchInput: state.searchInput,
            dropdownFilter: state.dropdownFilter,
         };
      case actionTypes.HIDE_LOADER:
         return {
            loaderShow: false,
            searchInput: state.searchInput,
            dropdownFilter: state.dropdownFilter,
         };
      case actionTypes.SET_SEARCH_INPUT:
         return {
            loaderShow: state.loaderShow,
            searchInput: action.payload,
            dropdownFilter: state.dropdownFilter,
         };
      case actionTypes.SET_DROPDOWN_FILTER:
         return {
            loaderShow: state.loaderShow,
            searchInput: state.searchInput,
            dropdownFilter: action.payload,
         };
      default:
         return state;
   }
};
export default itemsViewReducer;
