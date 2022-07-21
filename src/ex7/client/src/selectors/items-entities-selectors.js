const getItemsEntitiesState = (state) => state.itemsEntities;

export const getTodoList = (state) => getItemsEntitiesState(state).todoList;
export const getRemovedTasks = (state) => getItemsEntitiesState(state).removedTasks;
