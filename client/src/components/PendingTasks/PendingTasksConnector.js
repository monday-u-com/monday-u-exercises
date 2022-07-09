import { connect } from "react-redux";
import { getAllTasks } from "../../selectors/items-entities-selectors";
import PendingTasks from "./PendingTasks";

const mapStateToProps = (state, ownProps) => {
   const tasks = getAllTasks(state);
   return { tasks };
};

export default connect(mapStateToProps, null)(PendingTasks);
