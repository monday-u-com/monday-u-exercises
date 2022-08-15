import actionTypes from "../actions/constants";

const initialState = {
   loaderShow: true,
   searchInput: "",
   dropdownFilter: "all",
   sortDirection: "",
};

const itemsViewReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.ADD_TASK_PENDING || actionTypes.GET_TASKS_PENDING:
         return { ...state, loaderShow: true };
      case actionTypes.ADD_TASK_FULFILLED || actionTypes.ADD_TASK_REJECTED:
         return {
            ...state,
            loaderShow: false,
         };
      case actionTypes.GET_TASKS_FULFILLED || actionTypes.GET_TASKS_REJECTED:
         return {
            ...state,
            loaderShow: false,
         };
      case actionTypes.SET_SEARCH_INPUT:
         return {
            ...state,
            searchInput: action.payload,
         };
      case actionTypes.SET_DROPDOWN_FILTER:
         return { ...state, dropdownFilter: action.payload };
      case actionTypes.SET_SORT_DIRECTION:
         return { ...state, sortDirection: action.payload };
      default:
         return state;
   }
};
export default itemsViewReducer;
