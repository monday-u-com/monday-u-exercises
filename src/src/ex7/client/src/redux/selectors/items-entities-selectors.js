const getItemsEntities = state => state.itemsEntities;

export const getItems = (state) => getItemsEntities(state).items;

export const getSearchInput = (state) => state.itemsEntities.searchInput;

export const getTasksStatusState = (state) => state.itemsEntities.tasksStatus;

export const getDoneItems = (state) =>
  state.itemsEntities.items.filter((item) => item.status);