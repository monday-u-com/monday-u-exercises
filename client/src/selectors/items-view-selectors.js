const getItemsViewState = (state) => state.itemsView;
export const getLoaderValue = (state) => getItemsViewState(state).loaderShow;
export const getInputText = (state) => getItemsViewState(state).searchInput;

export const getTasksToDisplay = (state) => {
   let tasksToDisplay;
   const tasks = state.itemsEntities.tasks;
   const searchInputText = getInputText(state);

   if (searchInputText) {
      tasksToDisplay = tasks.filter((task) => {
         return task.text.toLowerCase().includes(searchInputText);
      });

      return tasksToDisplay;
   } else {
      return tasks;
   }
};
