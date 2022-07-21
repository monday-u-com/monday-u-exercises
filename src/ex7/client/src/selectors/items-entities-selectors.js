const getItemsEntitiesState = (state) => state.itemsEntities;

export const getTodoList = (state) => getItemsEntitiesState(state).todoList;
export const getTodoListLength = (state) =>
  getItemsEntitiesState(state).todoList.length;
export const getLastRemovedTasks = (state) =>
  getItemsEntitiesState(state).removedTasks.slice(-1)[0];
export const getHasRemovedTasks = (state) =>
  getItemsEntitiesState(state).removedTasks.length > 0;
export const getIsLoading = (state) => getItemsEntitiesState(state).isLoading;
