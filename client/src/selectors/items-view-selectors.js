import { getAllTasks } from "./items-entities-selectors";
import { filterBySearch, filterByDropdown } from "./services/item-view-filter";

const getItemsViewState = (state) => state.itemsView;
export const getLoaderValue = (state) => getItemsViewState(state).loaderShow;
export const getInputText = (state) => getItemsViewState(state).searchInput;
const getDropDownFilter = (state) => getItemsViewState(state).dropdownFilter;

export const getTasksToDisplay = (state) => {
   let tasksToDisplay = getAllTasks(state);

   tasksToDisplay = filterBySearch(state, tasksToDisplay, getInputText);
   tasksToDisplay = filterByDropdown(state, tasksToDisplay, getDropDownFilter);

   return tasksToDisplay;
};
