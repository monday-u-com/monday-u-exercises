import { createSelector } from "reselect";
import { getSearchTerm, getStatusFilter } from "./items-view-selectors";
import { filterByStatus } from "../services/status-filter-service";

// This is an accessor to the itemsEntities branch from the state
const getItemsEntities = state => state.itemsEntities;

// Now we use the accessor to get all the items without their keys
const getItems = state => Object.values(getItemsEntities(state));

// This selector returns the items after applying the filters on them
// It uses 3 selectors to get the data it needs - search term, status filter and the items themself
export const getFilteredItems = createSelector(
    getSearchTerm,
    getStatusFilter,
    getItems,
    (searchTerm, statusFilter, items) => {
        let filteredItems = items;

        if (searchTerm) {
            // If we have a search value then we filter the items by their name
            // checking they contains the search value
            filteredItems = filteredItems.filter(item => item?.name?.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (statusFilter) {
            // If we have a status filter then we call an helper function
            // that returns the items with the specific filter
            filteredItems = filterByStatus(statusFilter, filteredItems);
        }

        return filteredItems;
    }
)