export const filterBySearch = (state, tasksToDisplay, getInputText) => {
   const searchInputText = getInputText(state);

   if (searchInputText) {
      return tasksToDisplay.filter((task) => {
         return task.text.toLowerCase().includes(searchInputText);
      });
   }
   return tasksToDisplay;
};

export const filterByDropdown = (state, tasksToDisplay, getDropDownFilter) => {
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
