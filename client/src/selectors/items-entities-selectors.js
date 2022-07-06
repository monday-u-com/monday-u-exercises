const getItemsEntities = (state) => state.itemsEntities;
export const getAllTasks = (state) => getItemsEntities(state).tasks;
export const getInputText = (state) => state.itemsEntities.searchInput;
