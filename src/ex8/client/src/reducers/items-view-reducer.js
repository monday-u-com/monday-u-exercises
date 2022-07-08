import actionTypes from "../actions/constants";
import { STATUS_FILTER_OPTIONS } from "../constants/status-filter-options";

const initialState = {
  searchTerm: "",
  statusFilter: STATUS_FILTER_OPTIONS[0].value,
  lastDeletedItem: null,
  isLoading: false,
  isError: false
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH: {
      // Extract the search value from the action and return new updated state
      const { searchTerm } = action;
      return { ...state, searchTerm };
    }

    case actionTypes.FILTER_BY_STATUS: {
      // Extract the status filter value from the action and return new updated state
      const { statusFilter } = action;
      return { ...state, statusFilter };
    }

    case actionTypes.RESTORE_LAST_DELETED_ITEM: {
      // Once the last deleted item is restored, remove it from the state (without mutating it!)
      return { ...state, isError: false, isLoading: false, lastDeletedItem: null };
    }

    case actionTypes.FETCH_ITEMS_REQUEST:
    case actionTypes.REMOVE_ITEM_REQUEST:
    case actionTypes.TOGGLE_ITEM_REQUEST:
    case actionTypes.ADD_ITEM_REQUEST: {
      // Update the loading flag in the state for each request action
      // You can also create different loading flags and so you could display
      // a different loader for each case
      return { ...state, isLoading: true };
    }

    case actionTypes.REMOVE_ITEM_SUCCESS: {
      // Extract the item that was last deleted from the action and return new updated state
      const { item } = action;
      return { ...state, isError: false, isLoading: false, lastDeletedItem: item };
    }

    case actionTypes.FETCH_ITEMS_SUCCESS:
    case actionTypes.TOGGLE_ITEM_SUCCESS:
    case actionTypes.ADD_ITEM_SUCCESS: {
      // Update the state by returning a new updated state
      // where there is no error and we stop loading
      return { ...state, isError: false, isLoading: false };
    }

    case actionTypes.FETCH_ITEMS_FAILURE:
    case actionTypes.REMOVE_ITEM_FAILURE:
    case actionTypes.TOGGLE_ITEM_FAILURE:
    case actionTypes.ADD_ITEM_FAILURE: {
      // Stop loading and update the error flag in the state for each failure action
      // You can also create different error flags and so you could display
      // a different error state for each case
      return { ...state, isError: true, isLoading: false };
    }

    default:
      // Return the current state if the action should change the current state
      return state;
  }
};
export default itemsViewReducer;
