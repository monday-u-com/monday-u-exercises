import actionTypes from "../actions/constants";

const initialState = {
  todoList: [],
  removedTasks: [],
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK: {
      const { task } = action;
      return {
        ...state,
        todoList: [...state.todoList, ...task],
      };
    }
    case actionTypes.GET_ALL_TASKS: {
      const { result } = action;
      return {
        ...state,
        todoList: result,
      };
    }
    case actionTypes.DELETE_ALL: {
      return initialState;
    }
    case actionTypes.DELETE_TASK: {
      const { task } = action;
      const newtodoList = state.todoList.filter((x) => x.id !== task.id);
      let newRemovedTasks = [];
      const ifExist = state.removedTasks.map((item) => {
        return item.itemName;
      });
      if (!ifExist.includes(task.itemName)) {
        newRemovedTasks = [...state.removedTasks, { itemName: task.itemName }];
        if (newRemovedTasks.length > 10) newRemovedTasks.shift();
      } else {
        newRemovedTasks = [...state.removedTasks];
      }
      return {
        removedTasks: newRemovedTasks,
        todoList: newtodoList,
      };
    }
    case actionTypes.UPDATE_TASK: {
      const { task } = action;
      const newList = state.todoList.map((x) => {
        if (x.id === task.id) return task;
        else return x;
      });
      return {
        ...state,
        todoList: newList,
      };
    }
    case actionTypes.RESTORE_TASK: {
      const { task } = action;
      let newRemovedTasks = [...state.removedTasks];
      newRemovedTasks.pop();
      return {
        removedTasks: newRemovedTasks,
        todoList: [...state.todoList, ...task],
      };
    }
    default:
      return state;
  }
};

export default itemsEntitiesReducer;
