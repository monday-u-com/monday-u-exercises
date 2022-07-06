import actionTypes from "../actions/constants";

const initialState = {
   tasks: [],
   searchInput: "",
};

const itemsEntitiesReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.SET_TASKS:
         return { tasks: action.payload, searchInput: state.searchInput };

      case actionTypes.ADD_TASK_FULFILLED:
         return { tasks: [...state.tasks, ...action.payload], searchInput: state.searchInput };
      case actionTypes.ADD_TASK_REJECTED:
         console.error("Add task rejected from server");
         return { tasks: state.tasks, searchInput: state.searchInput };

      case actionTypes.CLEAR_TASKS_FULFILLED:
         return { tasks: [], searchInput: state.searchInput };
      case actionTypes.CLEAR_TASKS_REJECTED:
         console.error("Clear tasks rejected from server");
         return { tasks: state.tasks, searchInput: state.searchInput };

      case actionTypes.SORT_TASKS_FULFILLED:
         return { tasks: action.payload, searchInput: state.searchInput };
      case actionTypes.SORT_TASKS_REJECTED:
         console.error("Sort tasks rejected from server");
         return { tasks: state.tasks, searchInput: state.searchInput };

      case actionTypes.DELETE_TASK_FULFILLED:
         const newTasks = [...state.tasks].filter((item) => item.id !== action.meta.arg);
         return { tasks: newTasks, searchInput: state.searchInput };
      case actionTypes.DELETE_TASK_REJECTED:
         console.error("Delete task rejected from server");
         return { tasks: state.tasks, searchInput: state.searchInput };

      case actionTypes.CHECKMARK_TASK_FULFILLED:
         let items = [...state.tasks];
         const index = items.findIndex((el) => el.id === action.meta.arg.id);
         items[index].status = !items[index].status;

         return { tasks: items, searchInput: state.searchInput };
      case actionTypes.CHECKMARK_TASK_REJECTED:
         console.error("Checkmark task rejected from server");
         return { tasks: state.tasks, searchInput: state.searchInput };

      case actionTypes.SET_SEARCH_INPUT:
         return { tasks: state.tasks, searchInput: action.payload };

      default:
         return state;
   }
};

export default itemsEntitiesReducer;
