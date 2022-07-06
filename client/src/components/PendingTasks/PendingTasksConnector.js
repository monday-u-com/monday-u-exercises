import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllTasks } from "../../selectors/items-entities-selectors";
import PendingTasks from "./PendingTasks";

const mapStateToProps = (state, ownProps) => {
   const tasks = getAllTasks(state);
   return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingTasks);
