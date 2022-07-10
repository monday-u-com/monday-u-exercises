const getItemsEntities = state => state.itemsEntities;

export const getItems = (state) => getItemsEntities(state).items;
