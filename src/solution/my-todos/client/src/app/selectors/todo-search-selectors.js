const getTodoSearchByState = state => state.todoSearch;

export const getTodoSearchValue = state => getTodoSearchByState(state).search;