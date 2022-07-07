const getTodoFooterState = state => state.todoFooter;

export const getPendingTodosValue = state => getTodoFooterState(state).value;
