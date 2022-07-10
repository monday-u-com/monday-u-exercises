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
import { getRemovedTasks, getTodoList } from "../../selectors/items-entities-selectors";
import {
  getSearchInput,
  getMarked,
} from "../../selectors/items-view-selectors";

const mapStateToProps = (state) => {
  const todoList = getTodoList(state);
  const searchInput = getSearchInput(state);
  const marked = getMarked(state);
  const removedTasks = getRemovedTasks(state);
  return { todoList, searchInput, marked,removedTasks };
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
