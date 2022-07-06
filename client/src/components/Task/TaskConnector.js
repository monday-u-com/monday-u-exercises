import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Task from "./Task";
import { deleteTaskAction } from "../../actions/api-actions";

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ deleteTaskAction }, dispatch);
};

export default connect(mapDispatchToProps)(Task);
