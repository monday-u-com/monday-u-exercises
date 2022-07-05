import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLoaderValue } from "../../selectors/items-view-selectors";
import { loaderShowAction, loaderHideAction } from "../../actions/loader-actions";
import TaskList from "./TaskList";

const mapStateToProps = (state, ownProps) => {
   const isLoading = getLoaderValue(state);
   return { isLoading };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ loaderShowAction, loaderHideAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
