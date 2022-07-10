const getItemsView = state => state.itemsView;

export const getSearchInput = (state) => getItemsView(state).searchInput;
export const getMarked = (state) => getItemsView(state).marked;
