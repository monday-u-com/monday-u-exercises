import actionTypes from "./constants";
import {getLastDeletedItem} from "../selectors/items-view-selectors";
import {addItem} from "./add-item-actions";

const restoreLastDeletedItemAction = () => ({
    type: actionTypes.RESTORE_LAST_DELETED_ITEM
});

export const restoreLastDeletedItem = () => {
    return (dispatch, getState) => {
        // In this case, we need to get the last deleted item from the store
        // so we get here the current state of the store
        const state = getState();
        // Then, we use a selector to get the last deleted item
        const lastDeletedItem = getLastDeletedItem(state);

        // Now we can dispatch the action for restoring the item
        // That way we can update the store that this item has been already restored
        dispatch(restoreLastDeletedItemAction());
        // Restoring an item is actually just adding it again
        // so we call the action creator for the adding item action
        dispatch(addItem(lastDeletedItem.name));
    }
}