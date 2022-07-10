const getItemsEntities = (state) => state.itemsEntities;
export const getItems = (state) => getItemsEntities(state).items;
export const getLastAction = (state) => getItemsEntities(state).lastAction;
