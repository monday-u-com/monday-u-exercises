import actionTypes from "./constants";
import ListApiService from "../services/list-api-service";

const toggleItemRequestAction = () => ({
    type: actionTypes.TOGGLE_ITEM_REQUEST
});

const toggleItemSuccessAction = (itemId) => ({
    type: actionTypes.TOGGLE_ITEM_SUCCESS,
    itemId
});

const toggleItemFailureAction = () => ({
    type: actionTypes.TOGGLE_ITEM_FAILURE
});

export const toggleItem = (item) => {
    return async dispatch => {
        // First, we dispatch an action for the request of toggling an item
        // That way we can know when we should start loading the page
        dispatch(toggleItemRequestAction());

        try {
            // Now, we perform the request to the server for toggling the item
            await ListApiService.toggleDone(item);
            // Then, we can dispatch the success action and update the store by toggling the item from
            dispatch(toggleItemSuccessAction(item.id));
        } catch (e) {
            // If we get an error then we dispatch a failure action
            // That way we can show an error message
            dispatch(toggleItemFailureAction())
        }
    }
}