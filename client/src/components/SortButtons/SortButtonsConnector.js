import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllTasks } from "../../selectors/items-entities-selectors";
import { sortTasksAction } from "../../actions/api-actions";
import SortButtons from "./SortButtons";

const mapStateToProps = (state, ownProps) => {
   const tasks = getAllTasks(state);
   return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ sortTasksAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SortButtons);
