import { getAllTasks } from "./items-entities-selectors";
import { filterBySearch, filterByDropdown, sortByDirection } from "./services/item-view-filter";

const getItemsViewState = (state) => state.itemsView;
export const getLoaderValue = (state) => getItemsViewState(state).loaderShow;
export const getInputText = (state) => getItemsViewState(state).searchInput;
const getDropDownFilter = (state) => getItemsViewState(state).dropdownFilter;
const getSortDirection = (state) => getItemsViewState(state).sortDirection;

export const getTasksToDisplay = (state) => {
   let tasksToDisplay = getAllTasks(state);

   tasksToDisplay = filterBySearch(state, tasksToDisplay, getInputText);
   tasksToDisplay = filterByDropdown(state, tasksToDisplay, getDropDownFilter);
   tasksToDisplay = sortByDirection(state, tasksToDisplay, getSortDirection);

   return tasksToDisplay;
};
