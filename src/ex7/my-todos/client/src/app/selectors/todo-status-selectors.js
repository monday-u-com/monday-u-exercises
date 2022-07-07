const getTodoStatusByState = state => state.todoStatus;

export const getTodoStatusArray = state => getTodoStatusByState(state).array;
