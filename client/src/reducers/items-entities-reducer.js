import actionTypes from "../actions/constants";

const initialState = {
   tasks: [],
};

const itemsEntitiesReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.SET_TASKS:
         return { tasks: action.payload };
      case actionTypes.ADD_TASK_FULFILLED:
         return { tasks: [...state.tasks, ...action.payload] };
      case actionTypes.CLEAR_TASKS_FULFILLED:
         return { tasks: [] };
      default:
         return state;
   }
};

export default itemsEntitiesReducer;
