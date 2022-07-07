const getItemsEntities = (state) => state.itemsEntities.present;
export const getAllTasks = (state) => getItemsEntities(state).tasks;
