import actionTypes from "./constants";
import ListApiService from "../services/list-api-service";

const fetchItemsRequestAction = () => ({
    type: actionTypes.FETCH_ITEMS_REQUEST
});

const fetchItemsSuccessAction = (items) => ({
    type: actionTypes.FETCH_ITEMS_SUCCESS,
    items
});

const fetchItemsFailureAction = () => ({
    type: actionTypes.FETCH_ITEMS_FAILURE
});

export const fetchItems = () => {
    return async dispatch => {
        // First, we dispatch an action for the request of fetching the items
        // That way we can know when we should start loading the page
        dispatch(fetchItemsRequestAction());

        try {
            // Now, we perform the request to the server for fetching the items
            const items = await ListApiService.getItems();

            const itemsByIds = items.reduce((acc, item) => {
                acc[item.id] = item;
                return acc;
            }, {});

            // Once we get the items data we can serialize the data the way we need it
            // then dispatch the success action and update the store with the relevant data
            dispatch(fetchItemsSuccessAction(itemsByIds));
        } catch (e) {
            // If we get an error then we dispatch a failure action
            // That way we can show an error message
            dispatch(fetchItemsFailureAction());
        }
    }
}