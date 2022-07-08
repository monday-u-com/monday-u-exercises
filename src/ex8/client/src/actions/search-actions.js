import actionTypes from "./constants";

const searchAction = (searchTerm) => ({
    type: actionTypes.SEARCH,
    searchTerm
});

export const search = (searchTerm) => {
    return dispatch => {
        // In this case we just need to dispatch the action to update the store
        // with the value of the search input
        dispatch(searchAction(searchTerm));
    }
}