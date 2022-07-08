import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Task from "./Task";
import {
   deleteTaskAction,
   undoDeleteTaskAction,
   getAPITasksAction,
   setTasksAction,
} from "../../actions/api-actions";
import { getAllTasks } from "../../selectors/items-entities-selectors";

const mapStateToProps = (state, ownProps) => {
   const tasks = getAllTasks(state);
   return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators(
      { deleteTaskAction, undoDeleteTaskAction, getAPITasksAction, setTasksAction },
      dispatch
   );
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
