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
      case actionTypes.SORT_TASKS_FULFILLED:
         return { tasks: action.payload };
      case actionTypes.DELETE_TASK_FULFILLED:
         const newTasks = [...state.tasks].filter((item) => item.id !== action.meta.arg);

         return { tasks: newTasks };
      default:
         return state;
   }
};

export default itemsEntitiesReducer;
