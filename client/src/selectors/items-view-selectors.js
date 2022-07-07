const getItemsViewState = (state) => state.itemsView;
export const getLoaderValue = (state) => getItemsViewState(state).loaderShow;
export const getInputText = (state) => getItemsViewState(state).searchInput;
const getDropDownFilter = (state) => getItemsViewState(state).dropdownFilter;

export const getTasksToDisplay = (state) => {
   let tasksToDisplay = state.itemsEntities.tasks;

   tasksToDisplay = filterBySearch(state, tasksToDisplay);
   tasksToDisplay = filterByDropdown(state, tasksToDisplay);

   return tasksToDisplay;
};

const filterBySearch = (state, tasksToDisplay) => {
   const searchInputText = getInputText(state);

   if (searchInputText) {
      return tasksToDisplay.filter((task) => {
         return task.text.toLowerCase().includes(searchInputText);
      });
   }
   return tasksToDisplay;
};

const filterByDropdown = (state, tasksToDisplay) => {
   const dropdownFilterValue = getDropDownFilter(state);
   if (dropdownFilterValue === "done") {
      tasksToDisplay = tasksToDisplay.filter((task) => {
         return task.status === true;
      });
   } else if (dropdownFilterValue === "undone") {
      tasksToDisplay = tasksToDisplay.filter((task) => {
         return task.status === false;
      });
   }
   return tasksToDisplay;
};
