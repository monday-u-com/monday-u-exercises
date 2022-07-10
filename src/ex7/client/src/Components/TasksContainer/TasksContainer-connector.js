import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getTodoList } from "../../selectors/items-entities-selectors";
import {
  getSearchInput,
  getMarked,
} from "../../selectors/items-view-selectors";
import TasksContainer from "./TasksContainer";

const mapStateToProps = (state) => {
  const todoList = getTodoList(state);
  const searchInput = getSearchInput(state);
  const marked = getMarked(state);
  return { todoList, searchInput, marked };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
