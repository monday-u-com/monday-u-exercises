const getItemsEntities = state => state.itemsEntities;
export const getSearchInput = (state) => state.itemsEntities.searchInput
export const getItems = (state) => getItemsEntities(state).items;
