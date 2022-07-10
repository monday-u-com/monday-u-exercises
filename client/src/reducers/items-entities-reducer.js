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
      case actionTypes.ADD_TASK_REJECTED:
         console.error("Add task rejected from server");
         return { tasks: state.tasks };

      case actionTypes.CLEAR_TASKS_FULFILLED:
         return { tasks: [] };
      case actionTypes.CLEAR_TASKS_REJECTED:
         console.error("Clear tasks rejected from server");
         return { tasks: state.tasks };

      case actionTypes.SORT_TASKS_FULFILLED:
         return { tasks: action.payload };
      case actionTypes.SORT_TASKS_REJECTED:
         console.error("Sort tasks rejected from server");
         return { tasks: state.tasks };

      case actionTypes.DELETE_TASK_FULFILLED:
         const newTasks = [...state.tasks].filter((item) => item.id !== action.payload);
         return { tasks: newTasks };
      case actionTypes.DELETE_TASK_REJECTED:
         console.error("Delete task rejected from server");
         return { tasks: state.tasks };

      case actionTypes.UNDO_DELETE_REJECTED:
         console.error("Undo delete task rejected from server");
         return { tasks: state.tasks };

      case actionTypes.CHECKMARK_TASK_FULFILLED:
         let items = [...state.tasks];
         const index = items.findIndex((el) => el.id === action.payload);
         items[index].status = !items[index].status;

         return { tasks: items };
      case actionTypes.CHECKMARK_TASK_REJECTED:
         console.error("Checkmark task rejected from server");
         return { tasks: state.tasks };

      default:
         return state;
   }
};

export default itemsEntitiesReducer;
