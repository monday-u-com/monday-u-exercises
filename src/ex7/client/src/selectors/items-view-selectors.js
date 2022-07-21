import { getTodoList } from "./items-entities-selectors";

const getItemsView = (state) => state.itemsView;

export const getSearchInput = (state) => getItemsView(state).searchInput;
export const getMarked = (state) => getItemsView(state).marked;

export const getFilteredItems = (state) => {
  const searchInput = getSearchInput(state);
  const filterMark = getMarked(state);
  const todoList = getTodoList(state);

  const { marked, unmarked } = filterMark;
  const hasMarked = marked === true || unmarked === true;
  const hasSearch = searchInput.length !== 0;
  if (!hasMarked && !hasSearch) return todoList;

  const filterTask = (task) => {
    const { itemName, status } = task;
    if (hasSearch) {
      if (!itemName.toLowerCase().includes(searchInput.toLowerCase()))
        return false;
    }
    if (hasMarked) {
      return marked === status;
    }
    return true;
  };

  return todoList.filter((task) => {
    return filterTask(task);
  });
};
