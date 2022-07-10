import actionTypes from "./constants";

const filterByStatusAction = (statusFilter) => ({
    type: actionTypes.FILTER_BY_STATUS,
    statusFilter
});

export const filterByStatus = (statusFilter) => {
    return dispatch => {
        // In this case we just need to dispatch the action to update the store
        // with the value of the status filter
        dispatch(filterByStatusAction(statusFilter));
    }
}