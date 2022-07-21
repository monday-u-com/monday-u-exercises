import actionTypes from "./constants";
import ListApiService from "../services/list-api-service";

const removeItemRequestAction = () => ({
    type: actionTypes.REMOVE_ITEM_REQUEST
});

const removeItemSuccessAction = (item) => ({
    type: actionTypes.REMOVE_ITEM_SUCCESS,
    item
});

const removeItemFailureAction = (item) => ({
    type: actionTypes.REMOVE_ITEM_FAILURE,
    item
});

export const removeItem = (item) => {
    return async dispatch => {
        // First, we dispatch an action for the request of removing an item
        // That way we can know when we should start loading the page
        dispatch(removeItemRequestAction());

        try {
            // Now, we perform the request to the server for removing the item
            await ListApiService.deleteItem(item);
            // Then, we can dispatch the success action and update the store
            // by removing the item from it
            dispatch(removeItemSuccessAction(item));
        } catch (e) {
            // If we get an error then we dispatch a failure action
            // That way we can show an error message
            dispatch(removeItemFailureAction(item));
        }
    }
}