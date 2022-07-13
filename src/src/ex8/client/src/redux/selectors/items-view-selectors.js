const getItemsView = state => state.itemsView;

// 
export const getShowLoader = (state) => getItemsView(state).showLoader;