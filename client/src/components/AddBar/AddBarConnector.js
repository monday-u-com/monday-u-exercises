import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLoaderValue } from "../../selectors/items-view-selectors";
import { loaderShowAction, loaderHideAction } from "../../actions/loader-actions";
import { addTaskAction } from "../../actions/api-actions";
import AddBar from "./AddBar";

const mapStateToProps = (state, ownProps) => {
   const isLoading = getLoaderValue(state);
   return { isLoading };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ loaderShowAction, loaderHideAction, addTaskAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBar);
