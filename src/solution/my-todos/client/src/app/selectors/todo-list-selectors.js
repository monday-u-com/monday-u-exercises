const getTodoListState = state => state.todoList;

export const getTodoListValue = state => getTodoListState(state).todos;
