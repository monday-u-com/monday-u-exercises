import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TodoMainPage from "./TodoMainPage";
import {
  addTaskAction,
  getAllTasksAction,
  deleteAllAction,
  restoreTaskAction,
} from "../../actions/task-actions";
import {
  setSearchInputAction,
  setMarkedAction,
} from "../../actions/view-actions";
import {
  getHasRemovedTasks,
  getTodoListLength,
  getIsLoading,
} from "../../selectors/items-entities-selectors";
import {
  getSearchInput,
  getMarked,
} from "../../selectors/items-view-selectors";

const mapStateToProps = (state) => {
  const todoListLength = getTodoListLength(state);
  const searchInput = getSearchInput(state);
  const markeFilter = getMarked(state);
  const hasRemovedTasks = getHasRemovedTasks(state);
  const isLoading = getIsLoading(state);
  return {
    todoListLength,
    searchInput,
    markeFilter,
    hasRemovedTasks,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addTaskAction,
      getAllTasksAction,
      deleteAllAction,
      setSearchInputAction,
      setMarkedAction,
      restoreTaskAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoMainPage);
