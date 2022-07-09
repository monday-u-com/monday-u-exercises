import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loaderShowAction, loaderHideAction } from "../../actions/loader-actions";
import { addTaskAction } from "../../actions/api-actions";
import AddBar from "./AddBar";

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ loaderShowAction, loaderHideAction, addTaskAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(AddBar);
