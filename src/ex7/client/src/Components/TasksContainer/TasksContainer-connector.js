import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getFilteredItems } from "../../selectors/items-view-selectors";
import TasksContainer from "./TasksContainer";

const mapStateToProps = (state) => {
  const filteredTodoList = getFilteredItems(state);
  return { filteredTodoList };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
