const getTodoSortByState = state => state.todoSort;

export const getSortByObject = state => getTodoSortByState(state).obj;
export const getSortByLabel = state => getTodoSortByState(state).label;
export const getSortByValue = state => getTodoSortByState(state).sort;
