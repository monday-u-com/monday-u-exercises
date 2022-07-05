import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllTasks } from "../../selectors/items-entities-selectors";
import { loaderShowAction, loaderHideAction } from "../../actions/loader-actions";
import TaskList from "./TaskList";
import { getAPITasksAction, setTasksAction } from "../../actions/api-actions";

const mapStateToProps = (state, ownProps) => {
   const tasks = getAllTasks(state);
   return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators(
      { loaderShowAction, loaderHideAction, getAPITasksAction, setTasksAction },
      dispatch
   );
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
