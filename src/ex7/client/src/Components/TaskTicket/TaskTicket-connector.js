import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TaskTicket from "./TaskTicket";
import { deleteTaskAction,updateTaskAction } from "../../actions/task-actions";
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteTaskAction,updateTaskAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskTicket);
