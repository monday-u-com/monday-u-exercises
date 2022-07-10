import actionTypes from "./constants";
import ListApiService from "../services/list-api-service";

const addItemRequestAction = () => ({
    type: actionTypes.ADD_ITEM_REQUEST
});

const addItemSuccessAction = (item) => ({
    type: actionTypes.ADD_ITEM_SUCCESS,
    item
});

const addItemFailureAction = () => ({
    type: actionTypes.ADD_ITEM_FAILURE
});

export const addItem = (itemName) => {
    return async dispatch => {
        // First, we dispatch an action for the request of adding an item
        // That way we can know when we should start loading the page
        dispatch(addItemRequestAction());

        try {
            // Now, we perform the request to the server for adding the new item
            const item = await ListApiService.postItem(itemName);
            const { id, itemName: name } = item;
            // Once we get the new item data we can dispatch the success action
            // and update the new item in our store
            dispatch(addItemSuccessAction({ id, name }));
        } catch (e) {
            // If we get an error then we dispatch a failure action
            // That way we can show an error message
            dispatch(addItemFailureAction());
        }
    }
}