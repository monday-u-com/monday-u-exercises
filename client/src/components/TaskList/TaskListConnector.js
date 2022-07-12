import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTasksToDisplay } from "../../selectors/items-view-selectors";
import TaskList from "./TaskList";
import { getAPITasksAction, setTasksAction } from "../../actions/api-actions";

const mapStateToProps = (state, ownProps) => {
   const tasksToDisplay = getTasksToDisplay(state);

   return { tasksToDisplay };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ getAPITasksAction, setTasksAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
