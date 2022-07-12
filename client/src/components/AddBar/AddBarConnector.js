import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addTaskAction } from "../../actions/api-actions";
import AddBar from "./AddBar";

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ addTaskAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(AddBar);
