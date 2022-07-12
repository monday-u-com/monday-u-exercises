const getItemsView = state => state.itemsView;

export const getSearchTerm = state => getItemsView(state).searchTerm;
export const getStatusFilter = state => getItemsView(state).statusFilter;
export const getLastDeletedItem = state => getItemsView(state).lastDeletedItem;
export const getIsLoading = state => getItemsView(state).isLoading;
export const getIsError = state => getItemsView(state).isError;