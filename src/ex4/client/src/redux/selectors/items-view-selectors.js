export const getItemsView = (state) => state.itemsView;
export const getIsLoading = (state) => getItemsView(state).isLoading;
export const getOpenToast = (state) => getItemsView(state).openToast;
